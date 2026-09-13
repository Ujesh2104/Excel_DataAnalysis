import React, { useState } from 'react';
import { 
  Keyboard, 
  Search, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Layers, 
  BookOpen 
} from 'lucide-react';

export default function ShortcutsHub({ language = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const shortcutsList = [
    { category: "Navigation & Selection", key: "Ctrl + Shift + L", name: "Toggle AutoFilters", why: "Turn on/off header dropdown filters across 50,000 rows in 1 second." },
    { category: "Navigation & Selection", key: "F4", name: "Toggle Absolute Cell Lock ($)", name_hi: "Cell Reference Lock Karna", why: "Cycles $A$1 ➔ A$1 ➔ $A1 ➔ A1 to lock formula coordinates." },
    { category: "Navigation & Selection", key: "Alt + H + O + I", name: "Auto-fit Column Widths", why: "Instantly eliminates ### text clipping across active columns." },
    { category: "Navigation & Selection", key: "Ctrl + T", name: "Create Official Excel Table", why: "Converts raw range into a structured table for auto-expanding Pivot Tables." },
    { category: "Navigation & Selection", key: "Ctrl + 1", name: "Format Cells Dialog Box", why: "Directly configure Custom Number Formatting, Date styles, and Currencies." },
    { category: "Navigation & Selection", key: "Ctrl + Space", name: "Select Entire Column", why: "Fast column selection without scrolling." },
    { category: "Navigation & Selection", key: "Shift + Space", name: "Select Entire Row", why: "Fast row selection." },
    { category: "Formulas & Calculation", key: "Alt + =", name: "AutoSum Formula", why: "Inserts =SUM() automatically on selected numeric columns/rows." },
    { category: "Formulas & Calculation", key: "Shift + F3", name: "Insert Function Wizard", why: "Opens visual argument helper boxes for XLOOKUP, SUMIFS, IFS." },
    { category: "Formulas & Calculation", key: "Ctrl + ~ (Tilde)", name: "Show Formulas / Values Toggle", why: "Audit all formulas on the sheet at once to find syntax bugs." },
    { category: "Formulas & Calculation", key: "F2", name: "Edit Active Cell Formula", why: "Jump directly into formula bar edit mode." },
    { category: "Formulas & Calculation", key: "F9", name: "Evaluate Selected Formula Snippet", why: "Highlight part of a formula and press F9 to debug its intermediate result." },
    { category: "Data Cleaning & ETL", key: "Ctrl + E", name: "Trigger Flash Fill", why: "Auto-detects string extraction patterns to split names, IDs, phone numbers." },
    { category: "Data Cleaning & ETL", key: "Alt + A + V + V", name: "Data Validation Dialog", why: "Create dropdown lists to restrict bad user data entry." },
    { category: "Data Cleaning & ETL", key: "Ctrl + H", name: "Find and Replace", why: "Mass replace spaces, bad tokens, or dates across all sheets." },
    { category: "Pivot Tables & Analysis", key: "Alt + N + V", name: "Insert Pivot Table", why: "Launches Pivot Table creation modal." },
    { category: "Pivot Tables & Analysis", key: "Ctrl + Alt + F5", name: "Refresh All Connections", why: "Syncs all Pivot Tables and Power Query pipelines simultaneously." },
    { category: "VBA & Automation", key: "Alt + F11", name: "Open Visual Basic Editor (VBA)", why: "Open VBA IDE to write macros and custom UDF functions." },
    { category: "VBA & Automation", key: "Alt + F8", name: "Open Macro Runner", why: "Select and execute macros." }
  ];

  const categories = ['All', 'Navigation & Selection', 'Formulas & Calculation', 'Data Cleaning & ETL', 'Pivot Tables & Analysis', 'VBA & Automation'];

  const filteredShortcuts = shortcutsList.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.why.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (keyText) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(keyText);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Banner */}
      <div className="glass-panel" style={{
        padding: '32px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(16, 124, 65, 0.25) 0%, rgba(14, 22, 36, 0.9) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #107C41, #10B981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Keyboard size={24} color="#ffffff" />
          </div>
          <div>
            <span className="badge badge-green" style={{ fontSize: '11px', marginBottom: '2px' }}>
              SPEED ACCELERATOR CHEATSHEET
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              {language === 'en' ? 'Master Excel Keyboard Shortcuts Hub' : 'Master Excel Keyboard Shortcuts Hub'}
            </h1>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '10px 0 0 0' }}>
          {language === 'en'
            ? 'Boost your spreadsheet workflow speed by 5x. Learn the essential keyboard shortcuts used daily by senior Data Analysts.'
            : 'Excel me fast kaam karne ke essential keyboard shortcuts jo senior analysts daily use karte hain.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? '#10B981' : 'rgba(255, 255, 255, 0.05)',
                color: activeCategory === cat ? '#ffffff' : '#94a3b8',
                transition: 'all 0.15s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={14} color="#64748b" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Search shortcuts e.g. F4, Filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '8px 14px 8px 34px',
              color: '#ffffff',
              fontSize: '13px',
              outline: 'none',
              width: '240px'
            }}
          />
        </div>
      </div>

      {/* Shortcuts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredShortcuts.map((sc, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  background: '#094a26',
                  color: '#6ee7b7',
                  border: '1px solid #10B981',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {sc.key}
                </span>

                <button
                  onClick={() => handleCopy(sc.key)}
                  className="btn-secondary"
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                  title="Copy Shortcut"
                >
                  {copiedKey === sc.key ? 'Copied!' : <Copy size={12} />}
                </button>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                {sc.name}
              </h4>

              <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                {sc.why}
              </p>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="badge badge-blue" style={{ fontSize: '10px' }}>
                {sc.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
