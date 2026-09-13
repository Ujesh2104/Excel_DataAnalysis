import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Filter,
  CheckCircle,
  Database
} from 'lucide-react';

export default function ModuleList({ 
  modules, 
  onSelectModule, 
  language = 'en',
  completedModuleIds = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Foundations', 'Data Cleaning', 'Formulas', 'Lookups', 'Data Summarization', 'Modern Formulas', 'Financial Modeling', 'ETL & Automation', 'Visualization'];

  const filteredModules = modules.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.description[language] || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.badge.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory || (selectedCategory === 'ETL & Automation' && (m.category === 'ETL & Automation' || m.category === 'Automation'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
            {language === 'en' ? 'A-to-Z Excel Learning Curriculum' : 'A-to-Z Excel Complete Curriculum'}
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
            {language === 'en'
              ? '10 in-depth modules designed specifically for enterprise business & data analysts'
              : '10 In-depth corporate modules - zero se executive dashboard level tak'}
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search formulas, modules...' : 'Formulas ya topics search karein...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '8px 14px 8px 36px',
                color: '#f8fafc',
                fontSize: '13px',
                outline: 'none',
                width: '240px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: selectedCategory === cat ? '#10B981' : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {filteredModules.map((mod) => {
          const isCompleted = completedModuleIds.includes(mod.id);

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="glass-card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Card Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(16, 185, 129, 0.25)'
                    }}>
                      MODULE {mod.number}
                    </span>
                    <span className="badge badge-blue">
                      {mod.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={12} />
                      {mod.duration}
                    </span>
                    {isCompleted && (
                      <CheckCircle size={16} color="#34d399" />
                    )}
                  </div>
                </div>

                {/* Module Title */}
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '10px',
                  lineHeight: 1.35
                }}>
                  {mod.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '13px',
                  color: '#cbd5e1',
                  marginBottom: '16px',
                  lineHeight: 1.5
                }}>
                  {mod.description[language] || mod.description.en}
                </p>

                {/* Real-world dataset callout */}
                {mod.analystScenario && (
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Database size={14} color="#38bdf8" />
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      <strong style={{ color: '#38bdf8' }}>Case Dataset: </strong>
                      {mod.analystScenario.datasetName}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <span className="badge badge-green" style={{ fontSize: '11px' }}>
                  {mod.difficulty}
                </span>

                <span style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {language === 'en' ? 'Start Module' : 'Shuru Karein'}
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
