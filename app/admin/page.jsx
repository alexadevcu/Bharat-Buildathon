'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminPage() {
  const [view, setView] = useState('login'); // login | dashboard
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [buttonMode, setButtonMode] = useState('explore');
  const [dataLoading, setDataLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [toggleError, setToggleError] = useState('');

  // Check existing session on mount & subscribe to auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setView('dashboard');
        loadDashboard();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setView('dashboard');
        loadDashboard();
      } else if (event === 'SIGNED_OUT') {
        setView('login');
        setSubmissions([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadDashboard = async () => {
    setDataLoading(true);
    try {
      const [{ data: subs }, { data: settings }] = await Promise.all([
        supabase.from('submissions').select('*').order('submitted_at', { ascending: false }),
        supabase.from('app_settings').select('value').eq('key', 'hero_button_mode').single(),
      ]);
      if (subs) setSubmissions(subs);
      if (settings?.value) setButtonMode(settings.value);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async () => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setLoginError('Please fill in both email and password.');
      return;
    }

    setLoginError('');
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setLoginError('Incorrect email or password. Please try again.');
        } else {
          setLoginError(error.message);
        }
        return;
      }

      if (data?.session) {
        setView('dashboard');
        await loadDashboard();
      } else {
        setLoginError('Login returned no session. Please verify your credentials in Supabase.');
      }
    } catch (err) {
      console.error('Login exception:', err);
      setLoginError(err.message || 'Login failed. Please check your network connection.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('login');
    setSubmissions([]);
  };

  const handleDelete = async (id, teamName) => {
    if (!confirm(`Are you sure you want to delete the submission for "${teamName}"? This action cannot be undone.`)) return;
    const { error } = await supabase.from('submissions').delete().eq('id', id);
    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      setSubmissions(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggle = async () => {
    const newMode = buttonMode === 'explore' ? 'round2' : 'explore';
    setToggleLoading(true);
    setToggleError('');
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key: 'hero_button_mode', value: newMode }, { onConflict: 'key' });
      if (error) {
        setToggleError('Save failed: ' + error.message);
      } else {
        setButtonMode(newMode);
        localStorage.setItem('hero_button_mode', newMode);
      }
    } catch (err) {
      setToggleError('Save failed: ' + err.message);
    } finally {
      setToggleLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ['Team Name', 'Team Leader', 'Phone', 'Department', 'PPT Path', 'Prototype Link', 'Submitted At'];
    const rows = filteredSubmissions.map(s => [
      s.team_name, s.team_leader, s.leader_phone, s.department,
      s.ppt_url, s.prototype_link || '', new Date(s.submitted_at).toLocaleString('en-IN'),
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'round2_submissions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const getPptLink = async (path) => {
    if (!path) return;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank');
      return;
    }
    const { data } = await supabase.storage.from('ppt-uploads').createSignedUrl(path, 3600);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    } else {
      const { data: pubData } = supabase.storage.from('ppt-uploads').getPublicUrl(path);
      if (pubData?.publicUrl) window.open(pubData.publicUrl, '_blank');
    }
  };

  // Get unique departments list for dropdown filter
  const departmentsList = Array.from(
    new Set(submissions.map(s => s.department?.trim()).filter(Boolean))
  ).sort();

  // Multi-field search & department filter
  const filteredSubmissions = submissions.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    const matchesDept = selectedDept === 'all' || (s.department && s.department.trim().toLowerCase() === selectedDept.toLowerCase());

    if (!q) return matchesDept;

    const matchesSearch = (
      (s.team_name && s.team_name.toLowerCase().includes(q)) ||
      (s.team_leader && s.team_leader.toLowerCase().includes(q)) ||
      (s.department && s.department.toLowerCase().includes(q)) ||
      (s.leader_phone && s.leader_phone.toLowerCase().includes(q))
    );

    return matchesDept && matchesSearch;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
  };

  // ── Login View ──
  if (view === 'login') {
    return (
      <div className="adm-page adm-login-page">
        <div className="adm-login-container">
          <div className="adm-login-card">
            <div className="adm-login-header">
              <span className="adm-badge">🇮🇳 BHARAT BUILDATHON</span>
              <h1>Admin Dashboard</h1>
              <p>Sign in to manage Round 2 submissions and site settings</p>
            </div>
            
            <div className="adm-login-form">
              <div className="adm-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@bharatbuildathon.in"
                  autoComplete="email"
                />
              </div>

              <div className="adm-field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
                />
              </div>

              {loginError && <div className="adm-alert">⚠️ {loginError}</div>}

              <button
                type="button"
                className="adm-btn adm-btn--primary"
                disabled={loginLoading}
                onClick={handleLogin}
              >
                {loginLoading ? <><span className="adm-spinner" /> Authenticating...</> : 'Sign In to Dashboard →'}
              </button>

              <div className="adm-login-footer">
                <Link href="/" className="adm-back-link">← Back to Main Website</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard View ──
  return (
    <div className="adm-page adm-dashboard-page">
      {/* Top Navbar */}
      <header className="adm-nav">
        <div className="adm-nav-left">
          <Link href="/" className="adm-nav-brand">
            🇮🇳 <strong>Bharat Buildathon</strong>
          </Link>
          <span className="adm-nav-badge">Admin Portal</span>
        </div>
        <div className="adm-nav-right">
          <button className="adm-btn adm-btn--outline" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="adm-main">
        {/* Page Title Header */}
        <div className="adm-header-row">
          <div>
            <h1 className="adm-title">Round 2 Submissions & Controls</h1>
            <p className="adm-subtitle">Overview of student submissions and website configuration.</p>
          </div>
          <div className="adm-header-actions">
            <button className="adm-btn adm-btn--outline" onClick={loadDashboard} disabled={dataLoading}>
              {dataLoading ? 'Syncing...' : 'Refresh Data'}
            </button>
            <button className="adm-btn adm-btn--export" onClick={downloadCSV} disabled={!filteredSubmissions.length}>
              Export CSV ({filteredSubmissions.length})
            </button>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="adm-cards-grid">
          {/* Card 1: Submissions */}
          <div className="adm-card">
            <span className="adm-card-label">TOTAL SUBMISSIONS</span>
            <div className="adm-card-val">{submissions.length}</div>
            <span className="adm-card-sub">Round 2 PPT Files</span>
          </div>

          {/* Card 2: Departments */}
          <div className="adm-card">
            <span className="adm-card-label">DEPARTMENTS</span>
            <div className="adm-card-val">
              {departmentsList.length}
            </div>
            <span className="adm-card-sub">Unique academic departments</span>
          </div>

          {/* Card 3: Hero Switch */}
          <div className="adm-card adm-card--toggle">
            <span className="adm-card-label">HERO BUTTON TOGGLE</span>
            <div className="adm-toggle-control">
              <div className="adm-toggle-labels">
                <span className={buttonMode === 'explore' ? 'active' : ''}>Explore Ideathon</span>
                <span className={buttonMode === 'round2' ? 'active' : ''}>Round 2 Submissions</span>
              </div>
              <button
                className={`adm-switch${buttonMode === 'round2' ? ' active' : ''}`}
                onClick={handleToggle}
                disabled={toggleLoading}
              >
                <span className="adm-switch-handle" />
              </button>
            </div>
            {toggleLoading && <span className="adm-toggle-msg">Saving changes...</span>}
            {toggleError && <span className="adm-toggle-msg adm-toggle-msg--error">{toggleError}</span>}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="adm-table-header">
          <h2>
            Submissions 
            <span className="adm-count-pill">{filteredSubmissions.length} of {submissions.length}</span>
          </h2>

          <div className="adm-filter-bar">
            {/* Department Dropdown Filter */}
            <div className="adm-select-wrap">
              <label htmlFor="dept-filter" className="sr-only">Department</label>
              <select
                id="dept-filter"
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="adm-select-filter"
              >
                <option value="all">All Departments ({submissions.length})</option>
                {departmentsList.map(dept => (
                  <option key={dept} value={dept}>
                    {dept} ({submissions.filter(s => s.department?.trim().toLowerCase() === dept.toLowerCase()).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search Input */}
            <div className="adm-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search team, leader, phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="adm-search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedDept !== 'all') && (
              <button className="adm-btn adm-btn--reset" onClick={clearFilters}>
                Clear Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Data Table Container */}
        {dataLoading ? (
          <div className="adm-empty-box">
            <span className="adm-spinner adm-spinner--dark" />
            <p>Loading submission records...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="adm-empty-box">
            <p>
              {searchQuery || selectedDept !== 'all' 
                ? 'No submissions match your active filter criteria.' 
                : 'No Round 2 submissions received yet.'}
            </p>
            {(searchQuery || selectedDept !== 'all') && (
              <button className="adm-btn adm-btn--outline" onClick={clearFilters} style={{ marginTop: '12px' }}>
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="adm-table-card">
            <div className="adm-table-responsive">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Leader Name</th>
                    <th>Leader Phone</th>
                    <th>Department</th>
                    <th>PPT Presentation</th>
                    <th>Prototype Link</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((s, i) => (
                    <tr key={s.id}>
                      <td className="adm-td-index">{i + 1}</td>
                      <td className="adm-td-team">
                        <strong>{s.team_name}</strong>
                      </td>
                      <td>{s.team_leader}</td>
                      <td className="adm-td-phone">{s.leader_phone}</td>
                      <td>
                        <span className="adm-tag">{s.department}</span>
                      </td>
                      <td>
                        <button className="adm-table-btn" onClick={() => getPptLink(s.ppt_url)}>
                          <span>View Presentation</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </button>
                      </td>
                      <td>
                        {s.prototype_link ? (
                          <a href={s.prototype_link} target="_blank" rel="noopener noreferrer" className="adm-link">
                            Open Demo ↗
                          </a>
                        ) : (
                          <span className="adm-muted">—</span>
                        )}
                      </td>
                      <td className="adm-td-time">
                        {new Date(s.submitted_at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <button
                          className="adm-table-btn adm-table-btn--delete"
                          onClick={() => handleDelete(s.id, s.team_name)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
