import React from 'react';
import { 
  Sparkles, 
  Award, 
  Database, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export default function HeroBanner({ language = 'en', onStartLearning, onTakeTest }) {
  return (
    <div style={{
      position: 'relative',
      padding: '48px 24px 36px',
      overflow: 'hidden',
      borderRadius: '24px',
      background: 'radial-gradient(ellipse at top, #132a1e 0%, #0b0f17 70%)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      marginBottom: '36px'
    }}>
      {/* Background Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.5,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span className="badge badge-green">
            <Sparkles size={14} />
            {language === 'en' ? 'Complete A-to-Z Data Analyst Curriculum' : 'A-to-Z Data Analyst Ka Complete Roadmap'}
          </span>
          <span className="badge badge-amber">
            <Award size={14} />
            {language === 'en' ? '50-Mark Assessment & Practical Sandbox' : '50 Marks Ka Practical Test Engine'}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ffffff 30%, #a7f3d0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {language === 'en' 
            ? 'Master Microsoft Excel from Fundamentals to Advanced Analytics' 
            : 'Microsoft Excel Seekhein: Zero Se Advanced Data Analyst Level Tak'}
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#cbd5e1',
          maxWidth: '780px',
          margin: '0 auto 28px',
          lineHeight: 1.6
        }}>
          {language === 'en'
            ? 'Built specifically for corporate Data Analysts. Experience real-world enterprise scenarios (Sales.csv, Churn, P&L, ETL), step-by-step spreadsheet simulations, and deep-dive bilingual explanations.'
            : 'Realistic Corporate Data Analyst scenarios ke sath Excel seekhein. Real datasets (Sales.csv, Customer Churn, P&L Modeling), live step-by-step visual animations aur English + Hinglish me professional thinking framework.'}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          <button
            onClick={onStartLearning}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            <Layers size={18} />
            {language === 'en' ? 'Explore 10 A-to-Z Modules' : '10 Modules Explore Karein'}
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onTakeTest}
            className="btn-secondary"
            style={{ 
              padding: '12px 24px', 
              fontSize: '15px', 
              border: '1px solid rgba(245, 158, 11, 0.4)',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#fde68a'
            }}
          >
            <Award size={18} color="#f59e0b" />
            {language === 'en' ? 'Take 50-Mark Assessment' : '50 Marks Test Attempt Karein'}
          </button>
        </div>

        {/* Key Feature Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          textAlign: 'left'
        }}>
          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <TrendingUp size={20} color="#10B981" />
              <strong style={{ fontSize: '14px', color: '#f8fafc' }}>
                {language === 'en' ? 'Real Corporate Datasets' : 'Real Corporate Scenarios'}
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              {language === 'en' 
                ? 'No trivial examples. Work directly on Sales.csv, Multi-Currency logs, and Inventory tables.' 
                : 'Koi kitchen/ghar ke examples nahi! Sales.csv, P&L aur Churn data par senior analyst ki tarah think karein.'}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Cpu size={20} color="#38bdf8" />
              <strong style={{ fontSize: '14px', color: '#f8fafc' }}>
                {language === 'en' ? 'Interactive Visual Engine' : 'Live Formula Visualizer'}
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              {language === 'en' 
                ? 'Watch how formulas evaluate step-by-step with glowing cell coordinates and range tracking.' 
                : 'Formula kaise calculate hota hai step-by-step glowing cells aur live animation ke sath dekhein.'}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Award size={20} color="#fbbf24" />
              <strong style={{ fontSize: '14px', color: '#f8fafc' }}>
                {language === 'en' ? '50-Mark Rigorous Test' : '50 Marks Rigorous Test'}
              </strong>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              {language === 'en' 
                ? '20 MCQs + 30-mark multi-step formula problem statements with instant auto-grading.' 
                : '20 MCQs aur 30 marks ke practical problems auto-graded score ke sath.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
