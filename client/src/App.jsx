import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import ModuleList from './components/ModuleList';
import ModuleDetail from './components/ModuleDetail';
import ExcelSimulator from './components/ExcelSimulator';
import PracticeCasesHub from './components/PracticeCasesHub';
import ShortcutsHub from './components/ShortcutsHub';
import AssessmentTest from './components/AssessmentTest';
import PowerBiHub from './components/PowerBiHub';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import { API_BASE_URL } from './config';
import { 
  FileSpreadsheet, 
  Sparkles, 
  BookOpen, 
  Award, 
  BarChart3, 
  CheckCircle, 
  Database, 
  ExternalLink, 
  Briefcase, 
  Keyboard 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum', 'practice', 'shortcuts', 'simulator', 'test', 'powerbi', 'admin'
  const [language, setLanguage] = useState(() => localStorage.getItem('emp_lang') || 'en');
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [completedModuleIds, setCompletedModuleIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('emp_completed') || '[]');
    } catch {
      return [];
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('emp_admin');
      const token = localStorage.getItem('emp_token');
      const expiry = localStorage.getItem('emp_token_expiry');
      
      // Auto-expire token if past 24 hours
      if (expiry && Date.now() > parseInt(expiry, 10)) {
        localStorage.removeItem('emp_admin');
        localStorage.removeItem('emp_token');
        localStorage.removeItem('emp_token_expiry');
        return null;
      }
      return saved && token ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync language to local storage
  useEffect(() => {
    localStorage.setItem('emp_lang', language);
  }, [language]);

  // Sync completed modules
  useEffect(() => {
    localStorage.setItem('emp_completed', JSON.stringify(completedModuleIds));
  }, [completedModuleIds]);

  // Fetch modules from server
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/modules`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setModules(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load modules:", err);
        setLoading(false);
      });
  }, []);

  const handleToggleCompleteModule = (moduleId) => {
    setCompletedModuleIds(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleLoginSuccess = (admin, token) => {
    setAdminUser(admin);
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24hr expiration
    localStorage.setItem('emp_admin', JSON.stringify(admin));
    localStorage.setItem('emp_token', token);
    localStorage.setItem('emp_token_expiry', expiry.toString());
    setActiveTab('admin');
  };

  const handleLogout = () => {
    // Complete storage and token purge
    setAdminUser(null);
    localStorage.removeItem('emp_admin');
    localStorage.removeItem('emp_token');
    localStorage.removeItem('emp_token_expiry');
    setActiveTab('curriculum');
  };

  // Quick module navigation (Next / Prev)
  const currentModuleIndex = selectedModule 
    ? modules.findIndex(m => m.id === selectedModule.id) 
    : -1;

  const handleNextModule = currentModuleIndex >= 0 && currentModuleIndex < modules.length - 1
    ? () => setSelectedModule(modules[currentModuleIndex + 1])
    : null;

  const handlePrevModule = currentModuleIndex > 0
    ? () => setSelectedModule(modules[currentModuleIndex - 1])
    : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'curriculum') {
            setSelectedModule(null);
          }
        }}
        language={language}
        setLanguage={setLanguage}
        adminUser={adminUser}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Layout Container with Sidebar */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Persistent Collapsible Sidebar */}
        <Sidebar
          modules={modules}
          selectedModule={selectedModule}
          onSelectModule={(mod) => {
            setSelectedModule(mod);
            setActiveTab('curriculum');
          }}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'curriculum') setSelectedModule(null);
          }}
          completedModuleIds={completedModuleIds}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          language={language}
          adminUser={adminUser}
        />

        {/* Main Content Stage */}
        <main style={{ flex: 1, padding: '24px 32px', minWidth: 0 }}>
          {/* TAB 1: CURRICULUM & 5-STAGE MODULES */}
          {activeTab === 'curriculum' && (
            <div>
              {!selectedModule && (
                <>
                  <HeroBanner
                    language={language}
                    onStartLearning={() => {
                      if (modules.length > 0) setSelectedModule(modules[0]);
                    }}
                    onTakeTest={() => setActiveTab('test')}
                  />

                  <ModuleList
                    modules={modules}
                    onSelectModule={(mod) => setSelectedModule(mod)}
                    language={language}
                    completedModuleIds={completedModuleIds}
                  />
                </>
              )}

              {selectedModule && (
                <ModuleDetail
                  module={selectedModule}
                  onBack={() => setSelectedModule(null)}
                  onNextModule={handleNextModule}
                  onPrevModule={handlePrevModule}
                  onJumpToPractice={() => {
                    setActiveTab('practice');
                    setSelectedModule(null);
                  }}
                  language={language}
                  isCompleted={completedModuleIds.includes(selectedModule.id)}
                  onToggleComplete={() => handleToggleCompleteModule(selectedModule.id)}
                />
              )}
            </div>
          )}

          {/* TAB 2: SOLVED PRACTICE CASES HUB (MEDIUM TO HARD) */}
          {activeTab === 'practice' && (
            <PracticeCasesHub language={language} />
          )}

          {/* TAB 3: MASTER KEYBOARD SHORTCUTS HUB */}
          {activeTab === 'shortcuts' && (
            <ShortcutsHub language={language} />
          )}

          {/* TAB 4: INTERACTIVE SIMULATOR LAB */}
          {activeTab === 'simulator' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Sparkles size={24} color="#10B981" />
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                    {language === 'en' ? 'Interactive Excel Spreadsheet Simulation Lab' : 'Live Interactive Excel Spreadsheet Lab'}
                  </h1>
                </div>
                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0 }}>
                  {language === 'en'
                    ? 'Select any preset formula below to explore live step-by-step evaluation, formula bar typing animations, and color-coded cell ranges.'
                    : 'Niche diye gaye presets me se koi bhi choose karein aur live sheet animation dekhein.'}
                </p>
              </div>

              {/* Simulation Preset Selector */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
                {modules.filter(m => m.simulatorData).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModule(m)}
                    className="btn-secondary"
                    style={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      background: (selectedModule?.id || modules[3]?.id) === m.id ? '#10B981' : 'rgba(255,255,255,0.05)',
                      color: (selectedModule?.id || modules[3]?.id) === m.id ? '#ffffff' : '#94a3b8'
                    }}
                  >
                    Mod {m.number}: {m.simulatorData.title}
                  </button>
                ))}
              </div>

              <ExcelSimulator
                presetData={selectedModule?.simulatorData || modules[3]?.simulatorData}
                language={language}
              />
            </div>
          )}

          {/* TAB 5: 50-MARK ASSESSMENT TEST */}
          {activeTab === 'test' && (
            <AssessmentTest language={language} />
          )}

          {/* TAB 6: POWER BI HUB */}
          {activeTab === 'powerbi' && (
            <PowerBiHub language={language} />
          )}

          {/* TAB 7: ADMIN / TEACHER DASHBOARD */}
          {activeTab === 'admin' && adminUser && (
            <AdminDashboard
              adminUser={adminUser}
              onLogout={handleLogout}
              language={language}
            />
          )}
        </main>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#090d14',
        padding: '24px',
        zIndex: 30
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#107C41',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileSpreadsheet size={16} color="#ffffff" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>
              Excel Mastery Pro
            </span>
            <span style={{ fontSize: '13px', color: '#34d399', fontWeight: '600' }}>
              • Made with ❤️ by Ujesh Mishra
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Designed & Developed by <strong style={{ color: '#ffffff' }}>Ujesh Mishra</strong> (<span style={{ color: '#38bdf8' }}>ujeshmishra@gmail.com</span>) • Lead Data Analytics Instructor
          </div>
        </div>
      </footer>
    </div>
  );
}
