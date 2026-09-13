import React from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export default function VisualArrowDiagram({ flowData, language = 'en' }) {
  if (!flowData || !flowData.nodes) return null;

  return (
    <div style={{
      background: 'rgba(11, 15, 23, 0.8)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      borderRadius: '14px',
      padding: '20px',
      marginBottom: '24px',
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Sparkles size={16} color="#10B981" />
        <span style={{ fontSize: '13px', fontWeight: '800', color: '#10B981', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {flowData.title || (language === 'en' ? 'Visual Calculation & Argument Flow' : 'Visual Calculation & Argument Flow')}
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '10px'
      }}>
        {flowData.nodes.map((item, idx) => {
          if (item.arrow) {
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                color: '#34d399',
                fontWeight: 'bold',
                fontSize: '13px',
                whiteSpace: 'nowrap',
                userSelect: 'none'
              }}>
                {item.arrow}
              </div>
            );
          }

          return (
            <div
              key={idx}
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                border: `1.5px solid ${item.color || '#334155'}`,
                borderRadius: '10px',
                padding: '12px 16px',
                minWidth: '180px',
                maxWidth: '240px',
                flexShrink: 0,
                boxShadow: `0 4px 15px -3px ${item.color ? item.color + '33' : 'transparent'}`
              }}
            >
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: item.color || '#ffffff',
                marginBottom: '4px',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: 1.4 }}>
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
