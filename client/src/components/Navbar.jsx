import React from 'react';
import { 
  FileSpreadsheet, 
  Languages, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  Layers,
  Keyboard,
  Briefcase
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage, 
  adminUser, 
  onOpenAdminModal 
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      background: 'rgba(11, 15, 23, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('curriculum')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #107C41 0%, #10B981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
          }}>
            <FileSpreadsheet size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
                EXCEL MASTERY <span style={{ color: '#10B981' }}>PRO</span>
              </span>
              <span className="badge badge-green" style={{ fontSize: '10px', padding: '2px 8px' }}>
                DATA ANALYST EDITION
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>
              Complete A-to-Z Roadmap & Interactive Spreadsheet Lab
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('curriculum')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'curriculum' ? '600' : '500',
              color: activeTab === 'curriculum' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'curriculum' ? 'rgba(16, 124, 65, 0.7)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} />
            A-to-Z Modules
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'practice' ? '600' : '500',
              color: activeTab === 'practice' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'practice' ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(139, 92, 246, 0.7))' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Briefcase size={16} color="#93c5fd" />
            Solved Cases
          </button>

          <button
            onClick={() => setActiveTab('shortcuts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'shortcuts' ? '600' : '500',
              color: activeTab === 'shortcuts' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'shortcuts' ? 'rgba(16, 124, 65, 0.7)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Keyboard size={16} color="#34d399" />
            Shortcuts Hub
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'simulator' ? '600' : '500',
              color: activeTab === 'simulator' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'simulator' ? 'rgba(16, 124, 65, 0.7)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} />
            Live Grid Lab
          </button>

          <button
            onClick={() => setActiveTab('test')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'test' ? '600' : '500',
              color: activeTab === 'test' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'test' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Award size={16} />
            50-Mark Test
          </button>

          <button
            onClick={() => setActiveTab('powerbi')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'powerbi' ? '600' : '500',
              color: activeTab === 'powerbi' ? '#ffffff' : '#94a3b8',
              background: activeTab === 'powerbi' ? 'rgba(16, 124, 65, 0.7)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <BarChart3 size={16} />
            Power BI Hub
          </button>

          <button
            onClick={() => {
              if (adminUser) {
                setActiveTab('admin');
              } else {
                onOpenAdminModal();
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'admin' ? '600' : '500',
              color: adminUser ? '#34d399' : '#cbd5e1',
              background: activeTab === 'admin' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ShieldCheck size={16} color={adminUser ? '#34d399' : '#94a3b8'} />
            {adminUser ? 'Admin / Teacher' : 'Admin Login'}
          </button>
        </nav>

        {/* Language Switcher Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                background: language === 'en' ? '#10B981' : 'transparent',
                color: language === 'en' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                background: language === 'hi' ? '#10B981' : 'transparent',
                color: language === 'hi' ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              Hinglish
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
