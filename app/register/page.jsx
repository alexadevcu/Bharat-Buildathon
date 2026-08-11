'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function RegisterPage() {
  const [buttonMode, setButtonMode] = useState(null); // null | 'explore' | 'round2'
  const [checkingMode, setCheckingMode] = useState(true);

  const [form, setForm] = useState({
    team_name: '',
    team_leader: '',
    leader_phone: '',
    department: '',
    prototype_link: '',
  });
  const [pptFile, setPptFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Check admin toggle status on mount
  useEffect(() => {
    supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'hero_button_mode')
      .single()
      .then(({ data }) => {
        if (data?.value) {
          setButtonMode(data.value);
        } else {
          setButtonMode('explore');
        }
      })
      .catch(() => {
        setButtonMode('explore');
      })
      .finally(() => {
        setCheckingMode(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (file) => {
    const allowedExts = ['.pptx', '.ppt', '.pdf', '.pps'];
    const fileExt = '.' + (file.name.split('.').pop() || '').toLowerCase();
    
    if (!allowedExts.includes(fileExt)) {
      setErrorMsg('Please upload a valid presentation file (.pptx, .ppt, .pdf, or .pps).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 50 MB limit.');
      return;
    }

    setErrorMsg('');
    setPptFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!pptFile) {
      setErrorMsg('Please select or attach your PPT presentation file before submitting.');
      return;
    }

    setStatus('loading');

    try {
      // 1. Upload PPT File to Supabase Storage with collision-proof UUID filename
      const fileExt = (pptFile.name.split('.').pop() || 'pdf').toLowerCase();
      const cleanTeam = form.team_name.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'submission';
      const uniqueId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      const fileName = `${uniqueId}_${cleanTeam}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ppt-uploads')
        .upload(fileName, pptFile, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        throw new Error('File upload failed: ' + uploadError.message);
      }

      const ppt_url = uploadData.path;

      // 2. Insert record into Supabase submissions table
      const { error: insertError } = await supabase.from('submissions').insert([{
        team_name: form.team_name.trim(),
        team_leader: form.team_leader.trim(),
        leader_phone: form.leader_phone.trim(),
        department: form.department.trim(),
        ppt_url,
        prototype_link: form.prototype_link.trim() || null,
      }]);

      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error('A submission with this team name and leader already exists.');
        }
        throw new Error(insertError.message);
      }

      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  // 1. Loading state while checking mode
  if (checkingMode) {
    return (
      <div className="human-reg-page">
        <div className="human-reg-container" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div className="human-card" style={{ padding: '48px 24px' }}>
            <span className="human-spinner human-spinner--dark" style={{ width: '28px', height: '28px', margin: '0 auto 16px' }} />
            <p style={{ color: '#64748B', fontWeight: 600 }}>Checking portal status...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Submissions Closed state (when admin toggle is OFF / set to 'explore')
  if (buttonMode !== 'round2') {
    return (
      <div className="human-reg-page">
        <div className="human-reg-container">
          <div className="human-success-card">
            <div className="human-success-badge" style={{ background: '#FEF3C7', color: '#D97706' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>Round 2 Submissions Closed</h2>
            <p className="human-success-lead">
              The submission portal for Round 2 is currently not active.
            </p>
            <p className="human-success-sub">
              Submissions can only be made when opened by the organizing team. Please check back later or wait for official event notifications.
            </p>
            <div className="human-success-actions">
              <Link href="/" className="human-btn human-btn--primary">
                ← Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Submission Success State
  if (status === 'success') {
    return (
      <div className="human-reg-page">
        <div className="human-reg-container">
          <div className="human-success-card">
            <div className="human-success-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2>Submission Received</h2>
            <p className="human-success-lead">
              Team <strong>"{form.team_name}"</strong> has successfully submitted the Round 2 presentation for <strong>Bharat Buildathon 2026</strong>.
            </p>
            <p className="human-success-sub">
              Your submission has been securely recorded. The evaluation panel will review your project details.
            </p>
            <div className="human-success-actions">
              <Link href="/" className="human-btn human-btn--primary">
                ← Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Full Round 2 Form (Only active when buttonMode === 'round2')
  return (
    <div className="human-reg-page">
      <div className="human-reg-container">
        {/* Navigation Header */}
        <div className="human-reg-nav">
          <Link href="/" className="human-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Main Page</span>
          </Link>
          <span className="human-badge">🇮🇳 BHARAT BUILDATHON 2026</span>
        </div>

        {/* Page Heading */}
        <div className="human-reg-header">
          <span className="human-eyebrow">ROUND 2 SUBMISSION PORTAL</span>
          <h1 className="human-title">Submit Presentation & Project Details</h1>
          <p className="human-subtitle">
            Complete the form below to submit your team's Round 2 presentation. Please make sure your file is final before uploading.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="human-card">
          <form className="human-form" onSubmit={handleSubmit}>
            {/* Form Section 1: Team Info */}
            <div className="human-section">
              <h3 className="human-section-heading">1. Team & Leader Details</h3>
              
              <div className="human-grid">
                <div className="human-field">
                  <label htmlFor="team_name">
                    Team Name <span className="human-req">*</span>
                  </label>
                  <input
                    id="team_name"
                    name="team_name"
                    type="text"
                    placeholder="e.g. Team Phoenix"
                    value={form.team_name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="human-field">
                  <label htmlFor="team_leader">
                    Team Leader Name <span className="human-req">*</span>
                  </label>
                  <input
                    id="team_leader"
                    name="team_leader"
                    type="text"
                    placeholder="Full name of leader"
                    value={form.team_leader}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="human-field">
                  <label htmlFor="leader_phone">
                    Leader's Mobile Number <span className="human-req">*</span>
                  </label>
                  <input
                    id="leader_phone"
                    name="leader_phone"
                    type="tel"
                    placeholder="10-digit phone number"
                    value={form.leader_phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>

                <div className="human-field">
                  <label htmlFor="department">
                    Department of Leader <span className="human-req">*</span>
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="e.g. Computer Science & Engineering"
                    value={form.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="human-divider" />

            {/* Form Section 2: Submission Files */}
            <div className="human-section">
              <h3 className="human-section-heading">2. Presentation & Attachments</h3>

              {/* PPT File Upload */}
              <div className="human-field">
                <label>
                  Presentation File (PPTX / PDF) <span className="human-req">*</span>
                </label>
                
                <div
                  className={`human-upload-zone${dragging ? ' dragging' : ''}${pptFile ? ' has-file' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pptx,.ppt,.pdf,.pps"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                  />

                  {pptFile ? (
                    <div className="human-file-pill">
                      <div className="human-file-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                      </div>
                      <div className="human-file-meta">
                        <span className="human-file-name">{pptFile.name}</span>
                        <span className="human-file-size">{(pptFile.size / (1024 * 1024)).toFixed(2)} MB • Ready</span>
                      </div>
                      <button
                        type="button"
                        className="human-file-remove"
                        onClick={(e) => { e.stopPropagation(); setPptFile(null); }}
                        title="Remove file"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="human-upload-prompt">
                      <div className="human-upload-icon-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <div className="human-upload-text">
                        <strong>Click to select file</strong> or drag & drop here
                      </div>
                      <div className="human-upload-sub">
                        Accepts .pptx, .ppt, .pdf, or .pps (Max 50 MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Prototype Link */}
              <div className="human-field" style={{ marginTop: '20px' }}>
                <label htmlFor="prototype_link">
                  Prototype / Demo URL <span className="human-opt">(Optional)</span>
                </label>
                <input
                  id="prototype_link"
                  name="prototype_link"
                  type="url"
                  placeholder="https://github.com/... or https://your-demo.com"
                  value={form.prototype_link}
                  onChange={handleChange}
                />
                <span className="human-field-hint">
                  Provide a live demo, GitHub repository, or video link if available.
                </span>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="human-alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="human-submit-row">
              <button
                type="submit"
                className="human-btn human-btn--submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="human-spinner" />
                    <span>Submitting Presentation...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Round 2 PPT</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
