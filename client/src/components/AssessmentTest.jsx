import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Database, 
  FileSpreadsheet, 
  Code, 
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AssessmentTest({ language = 'en', onComplete }) {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('mcq'); // 'mcq' or 'practical'
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [practicalAnswers, setPracticalAnswers] = useState({});
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch sanitized test bank from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/test/assessment')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTestData(data.data);
        } else {
          setErrorMsg('Failed to load assessment questions.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Test fetch error:", err);
        setErrorMsg('Could not connect to backend test server.');
        setLoading(false);
      });
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTestStarted && !result && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, result, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectMCQ = (questionId, option) => {
    setMcqAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handlePracticalInputChange = (problemId, stepId, value) => {
    setPracticalAnswers(prev => ({
      ...prev,
      [problemId]: {
        ...(prev[problemId] || {}),
        [stepId]: value
      }
    }));
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim() || 'Data Analyst Candidate',
          studentEmail: studentEmail.trim() || 'candidate@enterprise.com',
          mcqAnswers,
          practicalAnswers
        })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        if (onComplete) {
          onComplete(data.data);
        }
      } else {
        alert('Grading error: ' + data.error);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert('Failed to connect to grading server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="badge badge-green" style={{ fontSize: '14px', padding: '8px 16px' }}>
          Loading 50-Mark Test Engine...
        </div>
      </div>
    );
  }

  if (errorMsg || !testData) {
    return (
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
        <AlertTriangle size={36} color="#f59e0b" style={{ marginBottom: '12px' }} />
        <h3 style={{ color: '#ffffff' }}>{errorMsg || 'Test bank unavailable'}</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Ensure backend Express server is running on port 5000.</p>
      </div>
    );
  }

  // Pre-test Start Gate
  if (!isTestStarted && !result) {
    return (
      <div className="glass-panel" style={{ maxWidth: '850px', margin: '0 auto', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)'
          }}>
            <Award size={36} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
            {language === 'en' ? '50-Mark Comprehensive Excel Assessment' : '50 Marks Ka Excel Practical Assessment'}
          </h1>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '620px', margin: '0 auto' }}>
            {language === 'en'
              ? 'Evaluate your corporate spreadsheet analytics skills under timed conditions with real business problem statements.'
              : 'Corporate level Excel problem statements ke sath test attempt karein aur instant scorecard hasil karein.'}
          </p>
        </div>

        {/* Test Structure Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <span className="badge badge-blue" style={{ marginBottom: '8px' }}>SECTION A</span>
            <h4 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 6px 0' }}>20 Objective MCQs</h4>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
              1 Mark each. Tests syntax, formula mechanics, error debugging, and shortcuts.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <span className="badge badge-green" style={{ marginBottom: '8px' }}>SECTION B</span>
            <h4 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 6px 0' }}>30 Marks Practical Problems</h4>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
              3 Multi-step real Data Analyst problem statements (10 Marks each). Write exact formulas.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <span className="badge badge-amber" style={{ marginBottom: '8px' }}>CONDITIONS</span>
            <h4 style={{ color: '#ffffff', fontSize: '16px', margin: '0 0 6px 0' }}>45 Minutes Timer</h4>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
              Auto-grades upon completion with step-by-step feedback.
            </p>
          </div>
        </div>

        {/* Student Profile Input (Optional) */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h4 style={{ color: '#f8fafc', fontSize: '14px', marginBottom: '12px' }}>
            {language === 'en' ? 'Candidate Details (For Certificate & Scorecard)' : 'Aapki Details (Scorecard ke liye)'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. rahul.analyst@enterprise.com"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
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
        </div>

        {/* Start Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setIsTestStarted(true)}
            className="btn-primary"
            style={{
              padding: '14px 40px',
              fontSize: '16px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Sparkles size={18} />
            {language === 'en' ? 'Start 50-Mark Assessment Now' : 'Assessment Shuru Karein'}
          </button>
        </div>
      </div>
    );
  }

  // Result / Scorecard View
  if (result) {
    return (
      <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: result.percentage >= 50 ? 'linear-gradient(135deg, #107C41, #10B981)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
          }}>
            <Award size={40} color="#ffffff" />
          </div>

          <span className="badge badge-green" style={{ fontSize: '13px', padding: '4px 14px', marginBottom: '12px' }}>
            {result.performanceBadge}
          </span>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', margin: '8px 0' }}>
            {result.performanceGrade}
          </h1>

          <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
            Candidate: <strong style={{ color: '#ffffff' }}>{result.studentName}</strong> ({result.studentEmail})
          </p>
        </div>

        {/* Score Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Total Score</span>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#10B981', margin: '4px 0 0 0' }}>
              {result.totalScore} / {result.maxScore}
            </h3>
          </div>

          <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Percentage</span>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#38bdf8', margin: '4px 0 0 0' }}>
              {result.percentage}%
            </h3>
          </div>

          <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>MCQ Section</span>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#fbbf24', margin: '4px 0 0 0' }}>
              {result.mcqScore} / 20
            </h3>
          </div>

          <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Practicals</span>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#a855f7', margin: '4px 0 0 0' }}>
              {result.practicalScore} / 30
            </h3>
          </div>
        </div>

        {/* Detailed Practical Breakdown */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
            Practical Formula Steps Evaluation Breakdown:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {result.practicalBreakdown?.map((pb, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '15px', margin: 0 }}>
                    {pb.title}
                  </h4>
                  <span className="badge badge-green">
                    Score: {pb.problemScore} / {pb.totalMarks}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pb.stepBreakdown?.map((sb, sIdx) => (
                    <div key={sIdx} style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                      borderLeft: sb.passed ? '3px solid #10B981' : '3px solid #ef4444'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600' }}>
                          {sb.instruction}
                        </span>
                        <span style={{ fontSize: '12px', color: sb.passed ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
                          {sb.marksAwarded} / {sb.totalMarks} Marks
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', fontFamily: 'JetBrains Mono', color: '#94a3b8', marginBottom: '4px' }}>
                        Your Formula: <span style={{ color: '#f8fafc' }}>{sb.userFormula}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: sb.passed ? '#34d399' : '#fbbf24' }}>
                        {sb.feedback}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retake Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setResult(null);
              setIsTestStarted(false);
              setMcqAnswers({});
              setPracticalAnswers({});
              setTimeLeft(45 * 60);
            }}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            <RotateCcw size={16} />
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  // Active Test Engine UI
  const mcqs = testData.mcqs || [];
  const practicals = testData.practicals || [];
  const currentMCQ = mcqs[currentMCQIndex];
  const answeredMCQCount = Object.keys(mcqAnswers).length;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Test Sticky Banner */}
      <div className="glass-panel" style={{
        padding: '16px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        position: 'sticky',
        top: '74px',
        zIndex: 40
      }}>
        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSection('mcq')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeSection === 'mcq' ? '#10B981' : 'rgba(255,255,255,0.05)',
              color: activeSection === 'mcq' ? '#ffffff' : '#94a3b8'
            }}
          >
            Section 1: MCQs ({answeredMCQCount}/20 Answered)
          </button>

          <button
            onClick={() => setActiveSection('practical')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeSection === 'practical' ? '#10B981' : 'rgba(255,255,255,0.05)',
              color: activeSection === 'practical' ? '#ffffff' : '#94a3b8'
            }}
          >
            Section 2: Practical Sandbox (30 Marks)
          </button>
        </div>

        {/* Timer & Submit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.15)',
            border: `1px solid ${timeLeft < 300 ? '#ef4444' : '#f59e0b'}`,
            padding: '6px 14px',
            borderRadius: '8px',
            color: timeLeft < 300 ? '#f87171' : '#fbbf24',
            fontWeight: '700',
            fontFamily: 'JetBrains Mono'
          }}>
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={handleSubmitTest}
            disabled={isSubmitting}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            <Send size={14} />
            {isSubmitting ? 'Grading Test...' : 'Finish & Submit Test'}
          </button>
        </div>
      </div>

      {/* Section 1: MCQ Interactive Area */}
      {activeSection === 'mcq' && currentMCQ && (
        <div>
          {/* Question Grid Palette */}
          <div className="glass-card" style={{ padding: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px', fontWeight: '600' }}>
              QUESTION NAVIGATION PALETTE (20 MCQs - 1 MARK EACH):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {mcqs.map((q, idx) => {
                const isAnswered = !!mcqAnswers[q.id];
                const isCurrent = idx === currentMCQIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentMCQIndex(idx)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: isCurrent ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                      background: isAnswered ? '#107C41' : 'rgba(255,255,255,0.05)',
                      color: isAnswered || isCurrent ? '#ffffff' : '#94a3b8',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question Display */}
          <div className="glass-panel" style={{ padding: '32px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-blue">
                QUESTION {currentMCQIndex + 1} OF 20
              </span>
              <span className="badge badge-green">
                1 Mark
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '24px', lineHeight: 1.5 }}>
              {currentMCQ.question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {currentMCQ.options?.map((opt, optIdx) => {
                const isSelected = mcqAnswers[currentMCQ.id] === opt;

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectMCQ(currentMCQ.id, opt)}
                    style={{
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #10B981' : '2px solid #64748b',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                    <span style={{ fontSize: '14px', color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Question Next/Prev Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setCurrentMCQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentMCQIndex === 0}
                className="btn-secondary"
                style={{ opacity: currentMCQIndex === 0 ? 0.3 : 1 }}
              >
                Previous Question
              </button>

              <button
                onClick={() => setCurrentMCQIndex(prev => Math.min(mcqs.length - 1, prev + 1))}
                disabled={currentMCQIndex === mcqs.length - 1}
                className="btn-primary"
                style={{ opacity: currentMCQIndex === mcqs.length - 1 ? 0.3 : 1 }}
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Practical Problem Statements */}
      {activeSection === 'practical' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {practicals.map((prob, pIdx) => (
            <div key={prob.id} className="glass-panel" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="badge badge-green">PROBLEM {pIdx + 1}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                    {prob.title}
                  </h3>
                </div>
                <span className="badge badge-amber">{prob.totalMarks} Marks</span>
              </div>

              {/* Scenario */}
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '18px' }}>
                {prob.scenario}
              </p>

              {/* Table Preview */}
              {prob.tablePreview && (
                <div className="excel-spreadsheet" style={{ marginBottom: '20px' }}>
                  <div style={{ overflowX: 'auto', padding: '10px' }}>
                    <table className="excel-table">
                      <thead>
                        <tr>
                          {prob.tablePreview.headers.map((h, hIdx) => (
                            <th key={hIdx}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {prob.tablePreview.rows.map((r, rIdx) => (
                          <tr key={rIdx}>
                            {r.map((c, cIdx) => (
                              <td key={cIdx} style={{ color: c.startsWith('[Task') ? '#38bdf8' : '#e2e8f0' }}>
                                {c}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Steps Formula Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {prob.steps.map((step, sIdx) => {
                  const currentValue = (practicalAnswers[prob.id] || {})[step.stepId] || '';

                  return (
                    <div key={step.stepId} style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px',
                      padding: '16px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#38bdf8' }}>
                          Step {sIdx + 1}: {step.instruction}
                        </span>
                        <span className="badge badge-blue">{step.marks} Marks</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          background: '#1e293b',
                          color: '#94a3b8',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          fontFamily: 'JetBrains Mono',
                          fontSize: '13px'
                        }}>
                          fx
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. =XLOOKUP(B5, Catalog!B2:B100, Catalog!A2:A100, &quot;Invalid SKU&quot;)"
                          value={currentValue}
                          onChange={(e) => handlePracticalInputChange(prob.id, step.stepId, e.target.value)}
                          style={{
                            flex: 1,
                            background: '#0b0f17',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            color: '#34d399',
                            fontFamily: 'JetBrains Mono',
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
