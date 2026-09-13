import React, { useState } from 'react';
import { 
  MousePointerClick, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  Info
} from 'lucide-react';

export default function RibbonExplorer({ activeModuleRibbon, language = 'en' }) {
  const [activeTab, setActiveTab] = useState('Data');

  const ribbonTabs = [
    {
      name: 'Home',
      groups: [
        { name: 'Number', buttons: ['Custom Formatting', 'Currency ($)', 'Percentage (%)', 'Comma Style', 'Increase/Decrease Decimals'] },
        { name: 'Styles', buttons: ['Conditional Formatting', 'Format as Table (Ctrl + T)', 'Cell Styles'] },
        { name: 'Editing', buttons: ['AutoSum (Alt + =)', 'Fill', 'Clear', 'Sort & Filter', 'Find & Select (Ctrl + H)'] }
      ]
    },
    {
      name: 'Insert',
      groups: [
        { name: 'Tables', buttons: ['PivotTable (Alt + N + V)', 'Recommended PivotTables', 'Table (Ctrl + T)'] },
        { name: 'Charts', buttons: ['Recommended Charts', 'Column / Bar Chart', 'Hierarchy Treemap', 'Waterfall Chart'] },
        { name: 'Sparklines', buttons: ['Line Sparkline (In-Cell)', 'Column Sparkline', 'Win/Loss'] },
        { name: 'Filters', buttons: ['Slicer (Interactive Buttons)', 'Timeline Slicer'] }
      ]
    },
    {
      name: 'Formulas',
      groups: [
        { name: 'Function Library', buttons: ['Insert Function (Shift + F3)', 'AutoSum', 'Financial (PMT, NPV)', 'Logical (IF, IFS, AND)', 'Text (TRIM, PROPER, TEXTSPLIT)', 'Lookup & Reference (XLOOKUP, INDEX, MATCH)'] },
        { name: 'Defined Names', buttons: ['Name Manager (Ctrl + F3)', 'Define Name (LAMBDA)', 'Create from Selection'] },
        { name: 'Formula Auditing', buttons: ['Trace Precedents', 'Trace Dependents', 'Show Formulas (Ctrl + ~)', 'Error Checking', 'Evaluate Formula'] }
      ]
    },
    {
      name: 'Data',
      groups: [
        { name: 'Get & Transform (Power Query)', buttons: ['Get Data > From Folder', 'From Text/CSV', 'From Web', 'From Table/Range', 'Launch Power Query Editor'] },
        { name: 'Sort & Filter', buttons: ['Sort A to Z', 'Sort Z to A', 'Filter (Ctrl + Shift + L)', 'Clear Filter', 'Advanced Filter'] },
        { name: 'Data Tools', buttons: ['Text to Columns (Alt + A + E)', 'Flash Fill (Ctrl + E)', 'Remove Duplicates', 'Data Validation (Dropdowns)'] },
        { name: 'Forecast', buttons: ['What-If Analysis > Goal Seek', 'What-If Analysis > Data Table', 'Scenario Manager', 'Forecast Sheet'] }
      ]
    },
    {
      name: 'View',
      groups: [
        { name: 'Show', buttons: ['Gridlines (Check/Uncheck)', 'Formula Bar', 'Headings (Row 1, 2, Col A, B)'] },
        { name: 'Window', buttons: ['Freeze Panes > Freeze Top Row', 'Freeze First Column', 'Split', 'New Window'] }
      ]
    },
    {
      name: 'Developer',
      groups: [
        { name: 'Code', buttons: ['Visual Basic (Alt + F11)', 'Macros (Alt + F8)', 'Record Macro', 'Use Relative References'] },
        { name: 'Controls', buttons: ['Insert > Form Button', 'View Code'] }
      ]
    }
  ];

  const currentTabData = ribbonTabs.find(t => t.name === activeTab) || ribbonTabs[3];

  return (
    <div style={{
      background: '#090d14',
      border: '1px solid #1e293b',
      borderRadius: '14px',
      overflow: 'hidden',
      marginBottom: '28px',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.6)'
    }}>
      {/* Top Ribbon Guide Title */}
      <div style={{
        background: '#094a26',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #107C41'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MousePointerClick size={18} color="#34d399" />
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Excel Ribbon Menu Guide (The Easy No-Code Click Way)
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#a7f3d0' }}>
          {language === 'en' ? 'Click tabs to explore official GUI buttons' : 'Menu tabs par click karke dekhein'}
        </span>
      </div>

      {/* Specific Module Menu Path (If provided) */}
      {activeModuleRibbon && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <div style={{
            background: '#107C41',
            color: '#ffffff',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            CLICK PATH
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399', marginBottom: '4px' }}>
              How to do this with Mouse Clicks in Excel: {activeModuleRibbon.clickPath}
            </div>
            <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
              {activeModuleRibbon.steps?.map((st, sIdx) => (
                <li key={sIdx}>{st}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Simulated Excel Ribbon Tabs Bar */}
      <div style={{
        background: '#131b29',
        borderBottom: '1px solid #334155',
        display: 'flex',
        overflowX: 'auto',
        padding: '2px 8px 0'
      }}>
        {ribbonTabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              style={{
                padding: '8px 18px',
                border: 'none',
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
                fontSize: '12px',
                fontWeight: isActive ? '700' : '500',
                cursor: 'pointer',
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? '#34d399' : '#94a3b8',
                borderBottom: isActive ? '2px solid #10B981' : 'none',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Ribbon Section Groups & Buttons */}
      <div style={{
        background: '#0f172a',
        padding: '14px 18px',
        display: 'flex',
        gap: '16px',
        overflowX: 'auto'
      }}>
        {currentTabData.groups.map((grp, gIdx) => (
          <div key={gIdx} style={{
            background: 'rgba(30, 41, 59, 0.4)',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '10px 14px',
            minWidth: '180px',
            flexShrink: 0
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#38bdf8',
              textTransform: 'uppercase',
              marginBottom: '8px',
              borderBottom: '1px solid #334155',
              paddingBottom: '4px'
            }}>
              {grp.name} Group
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {grp.buttons.map((btn, bIdx) => (
                <div
                  key={bIdx}
                  style={{
                    fontSize: '12px',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ color: '#10B981', fontSize: '10px' }}>▪</span>
                  <span>{btn}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
