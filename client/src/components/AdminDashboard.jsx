import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Award, 
  PlusCircle, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  FileSpreadsheet,
  LogOut,
  Download
} from 'lucide-react';

export default function AdminDashboard({ adminUser, onLogout, language = 'en' }) {
  const [activeAdminTab, setActiveAdminTab] = useState('analytics'); // 'analytics', 'powerbi_create', 'test_manager'
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Power BI Form State
  const [pbiTitle, setPbiTitle] = useState('');
  const [pbiInstructor, setPbiInstructor] = useState('Ujesh Mishra');
  const [pbiDate, setPbiDate] = useState('');
  const [pbiDuration, setPbiDuration] = useState('90 mins');
  const [pbiLevel, setPbiLevel] = useState('Intermediate');
  const [pbiLink, setPbiLink] = useState('');
  const [pbiDataset, setPbiDataset] = useState('Enterprise_Analytics_2026.pbix');
  const [pbiDescription, setPbiDescription] = useState('');
  const [pbiAgenda, setPbiAgenda] = useState('');
  const [pbiStatus, setPbiStatus] = useState(null);

  // Test Bank MCQ Form State
  const [mcqQuestion, setMcqQuestion] = useState('');
  const [mcqOptionA, setMcqOptionA] = useState('');
  const [mcqOptionB, setMcqOptionB] = useState('');
  const [mcqOptionC, setMcqOptionC] = useState('');
  const [mcqOptionD, setMcqOptionD] = useState('');
  const [mcqCorrect, setMcqCorrect] = useState('');
  const [mcqExplanation, setMcqExplanation] = useState('');
  const [mcqStatus, setMcqStatus] = useState(null);

  const fetchAnalytics = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalyticsData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Admin analytics fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleCreatePowerBiSession = async (e) => {
    e.preventDefault();
    if (!pbiTitle || !pbiDate) {
      alert('Please provide Session Title and Date/Time.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/powerbi/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pbiTitle,
          instructor: pbiInstructor,
          date: pbiDate,
          duration: pbiDuration,
          level: pbiLevel,
          meetLink: pbiLink || 'https://meet.google.com/pbi-masterclass',
          datasetDownload: pbiDataset,
          description: pbiDescription || 'Live interactive Data Modeling and DAX walkthrough.',
          agenda: pbiAgenda ? pbiAgenda.split('\n').filter(Boolean) : ['Data Modeling', 'DAX Measures']
        })
      });

      const res = await response.json();
      if (res.success) {
        setPbiStatus({ type: 'success', message: 'Power BI Session Scheduled Successfully!' });
        setPbiTitle('');
        setPbiDate('');
        setPbiDescription('');
        setPbiAgenda('');
        fetchAnalytics();
      } else {
        setPbiStatus({ type: 'error', message: res.error || 'Failed to create session' });
      }
    } catch (err) {
      console.error(err);
      setPbiStatus({ type: 'error', message: 'Network error connecting to backend.' });
    }
  };

  const handleAddMCQ = async (e) => {
    e.preventDefault();
    if (!mcqQuestion || !mcqOptionA || !mcqOptionB || !mcqCorrect) {
      alert('Please fill question, at least two options and the exact correct answer text.');
      return;
    }

    const options = [mcqOptionA, mcqOptionB, mcqOptionC, mcqOptionD].filter(Boolean);

    try {
      const response = await fetch('http://localhost:5000/api/admin/test/mcq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: mcqQuestion,
          options,
          correctAnswer: mcqCorrect,
          explanation: mcqExplanation,
          marks: 1
        })
      });

      const res = await response.json();
      if (res.success) {
        setMcqStatus({ type: 'success', message: 'Question added to 50-Mark Test Bank!' });
        setMcqQuestion('');
        setMcqOptionA('');
        setMcqOptionB('');
        setMcqOptionC('');
        setMcqOptionD('');
        setMcqCorrect('');
        setMcqExplanation('');
        fetchAnalytics();
      } else {
        setMcqStatus({ type: 'error', message: res.error || 'Failed to add question' });
      }
    } catch (err) {
      console.error(err);
      setMcqStatus({ type: 'error', message: 'Network error connecting to backend.' });
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Admin Header */}
      <div className="glass-panel" style={{
        padding: '28px 32px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(16, 124, 65, 0.2) 0%, rgba(14, 22, 36, 0.9) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #107C41, #10B981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
          }}>
            <ShieldCheck size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>
                ADMIN & TEACHER DASHBOARD
              </span>
              <span className="badge badge-blue">
                {adminUser?.email || 'ujeshmishra@gmail.com'}
              </span>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: '4px 0 0 0' }}>
              Instructor Control Center
            </h1>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <LogOut size={14} />
          Exit Admin View
        </button>
      </div>

      {/* Admin Sub-navigation */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveAdminTab('analytics')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            background: activeAdminTab === 'analytics' ? '#10B981' : 'rgba(255,255,255,0.05)',
            color: activeAdminTab === 'analytics' ? '#ffffff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Users size={16} />
          Student Test Analytics & Submissions
        </button>

        <button
          onClick={() => setActiveAdminTab('powerbi_create')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            background: activeAdminTab === 'powerbi_create' ? '#10B981' : 'rgba(255,255,255,0.05)',
            color: activeAdminTab === 'powerbi_create' ? '#ffffff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <BarChart3 size={16} />
          Schedule Power BI Session
        </button>

        <button
          onClick={() => setActiveAdminTab('test_manager')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            background: activeAdminTab === 'test_manager' ? '#10B981' : 'rgba(255,255,255,0.05)',
            color: activeAdminTab === 'test_manager' ? '#ffffff' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <PlusCircle size={16} />
          Manage 50-Mark Test Bank
        </button>
      </div>

      {/* Tab 1: Student Analytics & Submissions */}
      {activeAdminTab === 'analytics' && (
        <div>
          {/* Key Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Total Test Submissions</span>
              <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#10B981', margin: '6px 0 0 0' }}>
                {analyticsData?.stats?.totalAttempts || 0}
              </h3>
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Average Score</span>
              <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8', margin: '6px 0 0 0' }}>
                {analyticsData?.stats?.averageScore || 0} / 50
              </h3>
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Pass Rate (&ge; 50%)</span>
              <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24', margin: '6px 0 0 0' }}>
                {analyticsData?.stats?.passRate || 0}%
              </h3>
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Live Power BI Sessions</span>
              <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#a855f7', margin: '6px 0 0 0' }}>
                {analyticsData?.stats?.totalPowerBiSessions || 0}
              </h3>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                Recent Student Assessment Submissions
              </h3>
              <button
                onClick={fetchAnalytics}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Refresh Log
              </button>
            </div>

            {loading ? (
              <div style={{ color: '#94a3b8', padding: '20px', textAlign: 'center' }}>Loading student records...</div>
            ) : !analyticsData?.recentSubmissions || analyticsData.recentSubmissions.length === 0 ? (
              <div style={{ color: '#94a3b8', padding: '30px', textAlign: 'center' }}>
                No test submissions recorded yet. Take the 50-mark test to see instant student telemetry here!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Candidate Name</th>
                      <th>Email</th>
                      <th>MCQ (20)</th>
                      <th>Practical (30)</th>
                      <th>Total Score (50)</th>
                      <th>Percentage</th>
                      <th>Performance Grade</th>
                      <th>Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.recentSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: '600', color: '#ffffff' }}>{sub.studentName}</td>
                        <td style={{ color: '#94a3b8' }}>{sub.studentEmail}</td>
                        <td style={{ color: '#fbbf24' }}>{sub.mcqScore}</td>
                        <td style={{ color: '#a855f7' }}>{sub.practicalScore}</td>
                        <td style={{ fontWeight: '700', color: '#34d399' }}>{sub.totalScore}</td>
                        <td>{sub.percentage}%</td>
                        <td>
                          <span className="badge badge-green" style={{ fontSize: '11px' }}>
                            {sub.performanceGrade}
                          </span>
                        </td>
                        <td style={{ fontSize: '11px', color: '#64748b' }}>
                          {new Date(sub.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Schedule Power BI Session */}
      {activeAdminTab === 'powerbi_create' && (
        <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
            Schedule New Power BI Live Session
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
            This session will appear directly in the student Power BI Hub with links and datasets.
          </p>

          {pbiStatus && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              background: pbiStatus.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${pbiStatus.type === 'success' ? '#10B981' : '#ef4444'}`,
              color: pbiStatus.type === 'success' ? '#34d399' : '#f87171',
              fontSize: '13px'
            }}>
              {pbiStatus.message}
            </div>
          )}

          <form onSubmit={handleCreatePowerBiSession} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Session Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Masterclass: Advanced DAX CALCULATE & Context Transitions"
                value={pbiTitle}
                onChange={(e) => setPbiTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={pbiDate}
                  onChange={(e) => setPbiDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Duration
                </label>
                <input
                  type="text"
                  value={pbiDuration}
                  onChange={(e) => setPbiDuration(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Live Class Link (Google Meet / Zoom)
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={pbiLink}
                  onChange={(e) => setPbiLink(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Dataset Attachment (.pbix / .xlsx)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sales_Analytics_Model.pbix"
                  value={pbiDataset}
                  onChange={(e) => setPbiDataset(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Overview of the session..."
                value={pbiDescription}
                onChange={(e) => setPbiDescription(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '13px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Agenda Bullet Points (1 per line)
              </label>
              <textarea
                rows={3}
                placeholder="1. Star Schema Modeling&#10;2. CALCULATE vs FILTER&#10;3. Executive KPI Dashboard"
                value={pbiAgenda}
                onChange={(e) => setPbiAgenda(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '13px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
              Publish Power BI Session
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Test Bank MCQ Manager */}
      {activeAdminTab === 'test_manager' && (
        <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
            Add Question to 50-Mark Assessment Test Bank
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
            Added questions are stored strictly on the backend and auto-graded securely.
          </p>

          {mcqStatus && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              background: mcqStatus.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${mcqStatus.type === 'success' ? '#10B981' : '#ef4444'}`,
              color: mcqStatus.type === 'success' ? '#34d399' : '#f87171',
              fontSize: '13px'
            }}>
              {mcqStatus.message}
            </div>
          )}

          <form onSubmit={handleAddMCQ} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Question Text *
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Which formula computes the total revenue for 'North' region where sales > 50,000?"
                value={mcqQuestion}
                onChange={(e) => setMcqQuestion(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Option A *
                </label>
                <input
                  type="text"
                  value={mcqOptionA}
                  onChange={(e) => setMcqOptionA(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Option B *
                </label>
                <input
                  type="text"
                  value={mcqOptionB}
                  onChange={(e) => setMcqOptionB(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Option C
                </label>
                <input
                  type="text"
                  value={mcqOptionC}
                  onChange={(e) => setMcqOptionC(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  Option D
                </label>
                <input
                  type="text"
                  value={mcqOptionD}
                  onChange={(e) => setMcqOptionD(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0b0f17',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#fbbf24', marginBottom: '6px', fontWeight: 'bold' }}>
                Exact Correct Answer Option *
              </label>
              <input
                type="text"
                placeholder="Must match the exact text of the correct option above"
                value={mcqCorrect}
                onChange={(e) => setMcqCorrect(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #fbbf24',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#fbbf24',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Technical Explanation (Shown after test submission)
              </label>
              <textarea
                rows={2}
                value={mcqExplanation}
                onChange={(e) => setMcqExplanation(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0b0f17',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
              Add Question to Test Engine
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
