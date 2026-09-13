import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  BookOpen, 
  Sparkles, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Code2, 
  Search,
  CheckCircle,
  Briefcase,
  Keyboard
} from 'lucide-react';

export default function Sidebar({
  modules,
  selectedModule,
  onSelectModule,
  activeTab,
  setActiveTab,
  completedModuleIds = [],
  isCollapsed,
  setIsCollapsed,
  language = 'en',
  adminUser
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = (modules || []).filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.number.includes(searchTerm)
  );

  return (
    <aside style={{
      width: isCollapsed ? '72px' : '300px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(14, 22, 36, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 69px)',
      position: 'sticky',
      top: '69px',
      zIndex: 40,
      flexShrink: 0
    }}>
      {/* Sidebar Header & Collapse Toggle */}
      <div style={{
        padding: isCollapsed ? '16px 12px' : '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between'
      }}>
        {!isCollapsed && (
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#10B981', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Course Navigator
          </span>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn-secondary"
          style={{ padding: '6px', borderRadius: '8px', minWidth: '32px' }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main Feature Quick Links */}
      <div style={{ padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          onClick={() => {
            setActiveTab('curriculum');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'curriculum' && !selectedModule ? '700' : '500',
            color: activeTab === 'curriculum' && !selectedModule ? '#ffffff' : '#94a3b8',
            background: activeTab === 'curriculum' && !selectedModule ? 'rgba(16, 124, 65, 0.6)' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            marginBottom: '4px'
          }}
          title="All A-to-Z Modules"
        >
          <BookOpen size={18} color={activeTab === 'curriculum' && !selectedModule ? '#34d399' : '#94a3b8'} />
          {!isCollapsed && <span>A-to-Z Modules</span>}
        </button>

        <button
          onClick={() => {
            setActiveTab('practice');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'practice' ? '700' : '500',
            color: activeTab === 'practice' ? '#ffffff' : '#cbd5e1',
            background: activeTab === 'practice' ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.7), rgba(139, 92, 246, 0.7))' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            marginBottom: '4px'
          }}
          title="Solved Practice Cases Hub"
        >
          <Briefcase size={18} color={activeTab === 'practice' ? '#93c5fd' : '#60a5fa'} />
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Solved Practice Hub</span>
              <span className="badge badge-blue" style={{ fontSize: '9px', padding: '1px 6px' }}>5 CASES</span>
            </div>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('shortcuts');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'shortcuts' ? '700' : '500',
            color: activeTab === 'shortcuts' ? '#ffffff' : '#34d399',
            background: activeTab === 'shortcuts' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            marginBottom: '4px'
          }}
          title="Master Shortcuts Hub"
        >
          <Keyboard size={18} color="#34d399" />
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Shortcuts Hub</span>
              <span className="badge badge-green" style={{ fontSize: '9px', padding: '1px 6px' }}>SPEED</span>
            </div>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('simulator');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'simulator' ? '700' : '500',
            color: activeTab === 'simulator' ? '#ffffff' : '#94a3b8',
            background: activeTab === 'simulator' ? 'rgba(16, 124, 65, 0.6)' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            marginBottom: '4px'
          }}
          title="Live Grid Lab"
        >
          <Sparkles size={18} color={activeTab === 'simulator' ? '#34d399' : '#94a3b8'} />
          {!isCollapsed && <span>Live Grid Simulator</span>}
        </button>

        <button
          onClick={() => {
            setActiveTab('test');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'test' ? '700' : '500',
            color: activeTab === 'test' ? '#ffffff' : '#fbbf24',
            background: activeTab === 'test' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            marginBottom: '4px'
          }}
          title="50-Mark Test"
        >
          <Award size={18} color="#fbbf24" />
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>50-Mark Test</span>
              <span className="badge badge-amber" style={{ fontSize: '9px', padding: '1px 5px' }}>50 M</span>
            </div>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('powerbi');
            onSelectModule(null);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: activeTab === 'powerbi' ? '700' : '500',
            color: activeTab === 'powerbi' ? '#ffffff' : '#94a3b8',
            background: activeTab === 'powerbi' ? 'rgba(16, 124, 65, 0.6)' : 'transparent',
            cursor: 'pointer',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s'
          }}
          title="Power BI Hub"
        >
          <BarChart3 size={18} color={activeTab === 'powerbi' ? '#34d399' : '#94a3b8'} />
          {!isCollapsed && <span>Power BI Hub</span>}
        </button>
      </div>

      {/* Module Search (When expanded) */}
      {!isCollapsed && (
        <div style={{ padding: '12px 16px 8px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder="Search 10 modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                padding: '6px 10px 6px 30px',
                color: '#ffffff',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* 10 Module Tree List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isCollapsed ? '10px 6px' : '8px 12px' }}>
        {!isCollapsed && (
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', padding: '6px 8px', textTransform: 'uppercase' }}>
            Modules ({completedModuleIds.length}/{modules.length} Completed)
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {filteredModules.map((mod) => {
            const isCurrent = selectedModule?.id === mod.id;
            const isCompleted = completedModuleIds.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveTab('curriculum');
                  onSelectModule(mod);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: isCollapsed ? '10px 0' : '8px 10px',
                  borderRadius: '8px',
                  border: isCurrent ? '1px solid #10B981' : '1px solid transparent',
                  fontSize: '12px',
                  color: isCurrent ? '#ffffff' : isCompleted ? '#34d399' : '#cbd5e1',
                  background: isCurrent ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.15s'
                }}
                title={`Module ${mod.number}: ${mod.title}`}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: isCompleted ? '#107C41' : isCurrent ? '#10B981' : 'rgba(255, 255, 255, 0.06)',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isCompleted ? '✓' : mod.number}
                </div>

                {!isCollapsed && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: isCurrent ? '700' : '500',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {mod.title}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>
                      {mod.category}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
