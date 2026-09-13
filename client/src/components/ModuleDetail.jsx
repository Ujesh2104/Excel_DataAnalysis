import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Database, 
  CheckCircle2, 
  Lightbulb, 
  BrainCircuit, 
  Terminal, 
  Sparkles, 
  Layers, 
  AlertTriangle, 
  Code, 
  Briefcase, 
  MousePointerClick, 
  Keyboard 
} from 'lucide-react';
import ExcelSimulator from './ExcelSimulator';
import VisualArrowDiagram from './VisualArrowDiagram';
import RibbonExplorer from './RibbonExplorer';

export default function ModuleDetail({ 
  module, 
  onBack, 
  onNextModule, 
  onPrevModule, 
  onJumpToPractice,
  language = 'en',
  isCompleted,
  onToggleComplete 
}) {
  if (!module) return null;

  const scenarioText = language === 'hi' 
    ? module.analystScenario?.scenario_hi 
    : module.analystScenario?.scenario_en;

  const mindsetText = language === 'hi'
    ? module.analystScenario?.analystMindset_hi
    : module.analystScenario?.analystMindset_en;

  const definitionText = language === 'hi'
    ? module.definition?.hi
    : module.definition?.en;

  const whyItExistsText = language === 'hi'
    ? module.definition?.whyItExists?.hi
    : module.definition?.whyItExists?.en;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Top Navigation Bar with Sticky Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          onClick={onBack}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '13px' }}
        >
          <ArrowLeft size={16} />
          Back to All Modules
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {onPrevModule && (
            <button
              onClick={onPrevModule}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: '13px' }}
            >
              <ArrowLeft size={14} />
              Previous Module
            </button>
          )}

          <button
            onClick={onToggleComplete}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              background: isCompleted ? '#059669' : 'linear-gradient(135deg, #107C41 0%, #10B981 100%)'
            }}
          >
            <CheckCircle2 size={16} />
            {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
          </button>

          {onNextModule && (
            <button
              onClick={onNextModule}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: '13px' }}
            >
              Next Module
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Module Title Header */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '800',
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.15)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            MODULE {module.number}
          </span>
          <span className="badge badge-blue">{module.category}</span>
          <span className="badge badge-green">{module.difficulty}</span>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {module.duration}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(24px, 3.5vw, 36px)',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '14px',
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          {module.title}
        </h1>

        <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
          {module.description[language] || module.description.en}
        </p>
      </div>

      {/* 5-STAGE PEDAGOGICAL BLUEPRINT */}

      {/* STAGE 1: BASIC CONCEPT DEFINITION & WHY IT EXISTS */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid #38bdf8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-blue" style={{ fontSize: '11px' }}>STAGE 1</span>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
            Basic Concept Definition & Why It Exists
          </h3>
        </div>

        <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '16px' }}>
          {definitionText}
        </p>

        {whyItExistsText && (
          <div style={{
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: '10px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <Lightbulb size={18} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#93c5fd', display: 'block', marginBottom: '2px' }}>
                Why was this invented? (Traditional manual problem it solves):
              </strong>
              <span style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                {whyItExistsText}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* STAGE 2: HOW TO DO THIS IN EXCEL (RIBBON GUI CLICK PATH vs KEYBOARD SHORTCUTS) */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid #fbbf24' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span className="badge badge-amber" style={{ fontSize: '11px' }}>STAGE 2</span>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
            Menu Click Path & Keyboard Shortcuts (The Easy Way)
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>
          {language === 'en'
            ? 'You do not always have to write formulas manually. Here is how you do it by clicking top ribbon tabs and using keyboard shortcuts:'
            : 'Har baar complex formula type karne ki zaroorat nahi hai. Excel ke top tabs par click karke aur shortcuts se ye kaam 2 clicks me karein:'}
        </p>

        {/* Embedded Ribbon Click Path Explorer */}
        <RibbonExplorer 
          activeModuleRibbon={module.ribbonMethod} 
          language={language} 
        />

        {/* Essential Shortcuts for this module */}
        {module.ribbonMethod?.shortcuts && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Keyboard size={16} color="#10B981" />
              <strong style={{ fontSize: '13px', color: '#10B981' }}>Essential Shortcuts for this Topic:</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {module.ribbonMethod.shortcuts.map((sc, scIdx) => (
                <div key={scIdx} style={{
                  background: '#090d14',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{
                    background: '#094a26',
                    color: '#6ee7b7',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {sc.key}
                  </span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                    {sc.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STAGE 3: VISUAL ARROW BREAKDOWN & LIVE SIMULATOR */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid #10B981' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>STAGE 3</span>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
            Visual Arrow Breakdown & Live Spreadsheet Simulator
          </h3>
        </div>

        {/* Visual Flow Arrow Component */}
        {module.visualFlow && (
          <VisualArrowDiagram flowData={module.visualFlow} language={language} />
        )}

        {/* Interactive Excel Grid Simulator */}
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
          {language === 'en'
            ? 'Click "Play Flow (Step-by-Step)" to watch how data is inspected, evaluated, and validated with clear callouts.'
            : '"Play Flow" click karke dekhein ki input data kaise liya gaya, formula ne kya calculate kiya, aur result kaise validate hua.'}
        </p>

        <ExcelSimulator 
          presetData={module.simulatorData} 
          language={language}
        />
      </div>

      {/* STAGE 4: REAL DATA ANALYST CORPORATE SCENARIO & MINDSET */}
      {module.analystScenario && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(14, 22, 36, 0.95) 0%, rgba(19, 42, 30, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderLeft: '4px solid #a855f7',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="badge badge-purple" style={{ fontSize: '11px' }}>STAGE 4</span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#107C41',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BrainCircuit size={18} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#34d399', textTransform: 'uppercase' }}>
                Real Corporate Data Analyst Scenario
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                {module.analystScenario.datasetName}
              </h4>
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '16px',
            borderLeft: '4px solid #10B981'
          }}>
            <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
              {scenarioText}
            </p>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Lightbulb size={16} color="#fbbf24" />
              <strong style={{ fontSize: '13px', color: '#fbbf24' }}>
                Senior Analyst Diagnostic Strategy & Approach:
              </strong>
            </div>
            <p style={{
              fontSize: '13px',
              color: '#d1fae5',
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              margin: 0
            }}>
              {mindsetText}
            </p>
          </div>
        </div>
      )}

      {/* STAGE 5: PROGRESSIVE EXAMPLES & ERROR DEBUGGING */}
      {module.progressiveExamples && (
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-amber" style={{ fontSize: '11px' }}>STAGE 5</span>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              Graduated Practical Examples (Beginner ➔ Intermediate ➔ Advanced)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {module.progressiveExamples.map((ex, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>
                    {ex.level}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>
                    {ex.goal}
                  </span>
                </div>

                {/* Table representation */}
                {ex.table && (
                  <div className="excel-spreadsheet" style={{ marginBottom: '12px' }}>
                    <div style={{ overflowX: 'auto', padding: '8px' }}>
                      <table className="excel-table">
                        <thead>
                          <tr>
                            {ex.table.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ex.table.rows.map((r, rIdx) => (
                            <tr key={rIdx}>
                              {r.map((c, cIdx) => (
                                <td key={cIdx} style={{ color: c.includes('=') ? '#38bdf8' : '#e2e8f0' }}>
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

                <div style={{
                  background: '#090d14',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                  color: '#34d399',
                  border: '1px solid #334155',
                  marginBottom: '8px'
                }}>
                  Formula: {ex.formula}
                </div>

                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
                  <strong style={{ color: '#94a3b8' }}>Mechanics: </strong>
                  {ex.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Error Traps */}
          {module.errorDebugging && (
            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <AlertTriangle size={16} color="#f43f5e" />
                <strong style={{ fontSize: '14px', color: '#f87171' }}>Common Error Traps & Solutions:</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {module.errorDebugging.map((err, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(244, 63, 94, 0.06)',
                    border: '1px solid rgba(244, 63, 94, 0.2)',
                    borderRadius: '8px',
                    padding: '12px'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono',
                      fontWeight: 'bold',
                      color: '#f87171',
                      background: 'rgba(244, 63, 94, 0.2)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {err.code}
                    </span>
                    <p style={{ fontSize: '12px', color: '#e2e8f0', margin: '6px 0 4px 0' }}>
                      <strong>Cause: </strong>{err.cause}
                    </p>
                    <div style={{ fontSize: '12px', color: '#34d399' }}>
                      <strong>Fix: </strong>{err.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer & Jump to Solved Practice Cases */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' }}>
            Finished this module?
          </h4>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Mark complete and test your problem solving skills in the Practice Solved Cases Hub.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onJumpToPractice && (
            <button
              onClick={onJumpToPractice}
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: '13px', border: '1px solid #38bdf8', color: '#38bdf8' }}
            >
              <Briefcase size={16} />
              Explore Solved Practice Cases
            </button>
          )}

          <button
            onClick={onToggleComplete}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <CheckCircle2 size={16} />
            {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
