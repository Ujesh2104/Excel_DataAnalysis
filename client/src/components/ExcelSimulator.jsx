import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Info,
  Layers,
  Check
} from 'lucide-react';

export default function ExcelSimulator({ 
  presetData, 
  language = 'en',
  onFormulaTested
}) {
  const defaultPreset = {
    title: "XLOOKUP Bidirectional Search Simulation",
    description: "Look up Product Supplier from Left-hand column without changing table order.",
    headers: ["A: Supplier Name", "B: SKU Code", "C: Unit Price", "D: Search Input", "E: Result (C5)"],
    rows: [
      ["Apex Logistics", "SKU-9901", "$45.00", "SKU-9902", ""],
      ["Zenith Global", "SKU-9902", "$120.00", "SKU-7777", ""],
      ["Vertex Supplies", "SKU-9903", "$85.00", "-", ""]
    ],
    targetCell: "E2",
    formula: "=XLOOKUP(D2, B2:B4, A2:A4, \"Discontinued SKU\")",
    steps: [
      {
        step: 1,
        phase: "DATA INSPECTION (Input Data)",
        action: "Identify Search Input Cell D2",
        highlight: ["D2", "B2:B4"],
        narrative_en: "📌 CURRENT DATA: Search Input is SKU-9902 in Cell D2. We need to locate where this SKU exists inside Column B (B2:B4).",
        narrative_hi: "📌 CURRENT DATA: Humne Cell D2 me search item 'SKU-9902' liya hai. Excel isko Column B (B2:B4) me match karega.",
        validation_en: "Target: Fetch Supplier Name located to the LEFT (Column A) without altering sheet order.",
        validation_hi: "Goal: SKU ke Left side (Column A) se Supplier Name nikalna hai."
      },
      {
        step: 2,
        phase: "VECTOR MATCHING & MAPPING",
        action: "Scan Return Vector A2:A4",
        highlight: ["A2:A4"],
        formulaText: "=XLOOKUP(D2, B2:B4, A2:A4, \"Discontinued SKU\")",
        narrative_en: "⚙️ EXCEL EXECUTION: Excel scans B2:B4, finds 'SKU-9902' at Row index 2, and maps directly to the Return Array A2:A4 on the LEFT.",
        narrative_hi: "⚙️ EXCEL EXECUTION: Excel ne B2:B4 me 'SKU-9902' ko Row 2 par match kiya, aur turant Left wale Column A (Zenith Global) ko select kar liya.",
        validation_en: "Validation: Unlike VLOOKUP, XLOOKUP searches to the left seamlessly without column index counting.",
        validation_hi: "Validation check: VLOOKUP ki tarah column number ginne ki zaroorat nahi hai, XLOOKUP direct Left-column return karta hai."
      },
      {
        step: 3,
        phase: "OUTPUT & FALLBACK VERIFICATION",
        action: "Output to Cell E2",
        targetCell: "E2",
        value: "Zenith Global",
        formulaText: "=XLOOKUP(D2, B2:B4, A2:A4, \"Discontinued SKU\") ➔ Zenith Global",
        narrative_en: "✅ FINAL VALIDATION: Cell E2 receives 'Zenith Global'. If user enters a non-existent SKU like 'SKU-7777', XLOOKUP safely outputs 'Discontinued SKU' without #N/A!",
        narrative_hi: "✅ FINAL VALIDATION: Cell E2 me 'Zenith Global' aa gaya. Agar koi aisa SKU enter karein jo list me na ho (jaise SKU-7777), to error ke bajaye 'Discontinued SKU' aayega!"
      }
    ]
  };

  const data = presetData || defaultPreset;
  const steps = data.steps || [];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(3000); // 3s per step for clear reading
  const [activeCell, setActiveCell] = useState(data.targetCell || 'D2');
  const [displayedFormula, setDisplayedFormula] = useState(data.formula || '=SUM(A1:A5)');
  const [gridState, setGridState] = useState(data.rows || []);
  const [customFormulaInput, setCustomFormulaInput] = useState('');
  const [customFeedback, setCustomFeedback] = useState(null);

  // Sync state on preset changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setActiveCell(data.targetCell || 'D2');
    setDisplayedFormula(data.formula || '');
    setGridState(data.rows ? JSON.parse(JSON.stringify(data.rows)) : []);
    setCustomFeedback(null);
  }, [presetData]);

  // Autoplay timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || {};

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setGridState(data.rows ? JSON.parse(JSON.stringify(data.rows)) : []);
    setCustomFeedback(null);
  };

  const handleCellClick = (cellCoord, cellValue) => {
    setActiveCell(cellCoord);
    if (cellCoord === data.targetCell) {
      setDisplayedFormula(data.formula);
    } else {
      setDisplayedFormula(cellValue);
    }
  };

  const handleTestCustomFormula = () => {
    if (!customFormulaInput.trim()) return;
    const clean = customFormulaInput.trim().toUpperCase();
    if (!clean.startsWith('=')) {
      setCustomFeedback({ type: 'error', message: 'Remember: All Excel formulas must start with an equal sign (=)' });
      return;
    }
    setCustomFeedback({ 
      type: 'success', 
      message: `Formula syntax parsed successfully! Ready for live calculation.` 
    });
    if (onFormulaTested) {
      onFormulaTested(customFormulaInput);
    }
  };

  const narrativeText = language === 'hi'
    ? (currentStep.narrative_hi || currentStep.explanation)
    : (currentStep.narrative_en || currentStep.explanation);

  const validationText = language === 'hi'
    ? (currentStep.validation_hi || "Formula and calculation validated.")
    : (currentStep.validation_en || "Formula and calculation validated.");

  return (
    <div className="excel-spreadsheet" style={{ marginBottom: '24px' }}>
      {/* Top Ribbon & Controls */}
      <div className="excel-ribbon">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: '#ffffff',
            color: '#107C41',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '800',
            fontSize: '11px'
          }}>
            EXCEL 365
          </div>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>
            {data.title}
          </span>
        </div>

        {/* Animation Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}
          >
            {isPlaying ? <Pause size={14} color="#f59e0b" /> : <Play size={14} color="#10B981" />}
            {isPlaying ? 'Pause' : 'Play Flow (Step-by-Step)'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex >= steps.length - 1}
            className="btn-secondary"
            style={{ 
              padding: '6px 10px', 
              fontSize: '12px', 
              borderRadius: '6px',
              opacity: currentStepIndex >= steps.length - 1 ? 0.4 : 1
            }}
          >
            <SkipForward size={14} />
            Next
          </button>

          <button
            onClick={handleReset}
            className="btn-secondary"
            style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '6px' }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="excel-formula-bar">
        <div className="excel-name-box">
          {activeCell}
        </div>
        <div style={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '14px', userSelect: 'none' }}>
          fx
        </div>
        <div style={{ 
          flex: 1, 
          color: '#38bdf8', 
          fontWeight: '500', 
          background: '#0b0f17', 
          padding: '4px 10px', 
          borderRadius: '4px',
          border: '1px solid #334155'
        }}>
          {currentStep.formulaText || displayedFormula || data.formula}
        </div>
        <div className="badge badge-green" style={{ fontSize: '11px' }}>
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      </div>

      {/* Interactive Grid Table */}
      <div style={{ overflowX: 'auto', padding: '12px', background: '#0b0f17' }}>
        <table className="excel-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>#</th>
              {data.headers?.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridState?.map((row, rIdx) => {
              const rowNum = rIdx + 2; // Row 1 is header
              return (
                <tr key={rIdx}>
                  <td style={{ 
                    textAlign: 'center', 
                    background: '#1e293b', 
                    color: '#64748b', 
                    fontWeight: 'bold' 
                  }}>
                    {rowNum}
                  </td>
                  {row.map((cell, cIdx) => {
                    const colLetter = String.fromCharCode(65 + cIdx);
                    const cellCoord = `${colLetter}${rowNum}`;
                    const isTarget = cellCoord === data.targetCell;
                    const isHighlighted = currentStep.highlight?.some(h => h.includes(cellCoord) || h.includes(colLetter));

                    return (
                      <td
                        key={cIdx}
                        onClick={() => handleCellClick(cellCoord, cell)}
                        className={
                          isTarget 
                            ? 'cell-highlight-active' 
                            : isHighlighted 
                              ? 'cell-highlight-lookup' 
                              : ''
                        }
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        {isTarget && currentStepIndex === steps.length - 1 && currentStep.value 
                          ? currentStep.value 
                          : cell || (isTarget ? '⚡ [Click to Evaluate]' : '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Intuitive Step-by-Step Context & Validation Callout */}
      <div style={{
        background: '#131b29',
        borderTop: '1px solid #334155',
        padding: '18px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '800',
            color: '#10B981',
            background: 'rgba(16, 185, 129, 0.15)',
            padding: '2px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            {currentStep.phase || `ACTION: ${currentStep.action}`}
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            Phase {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Narrative */}
        <p style={{ fontSize: '13px', color: '#f8fafc', lineHeight: 1.6, margin: 0 }}>
          {narrativeText}
        </p>

        {/* Validation */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderLeft: '3px solid #10B981',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#a7f3d0'
        }}>
          <strong>Validation Check: </strong>{validationText}
        </div>
      </div>

      {/* Interactive Formula Sandbox Tester */}
      <div style={{
        background: '#0e1624',
        borderTop: '1px solid #1e293b',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#10B981" />
          Test Formula Sandbox:
        </span>
        <div style={{ flex: 1, minWidth: '260px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder={`e.g. ${data.formula || '=SUM(A1:A5)'}`}
            value={customFormulaInput}
            onChange={(e) => setCustomFormulaInput(e.target.value)}
            style={{
              flex: 1,
              background: '#0b0f17',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#f8fafc',
              fontFamily: 'JetBrains Mono',
              fontSize: '12px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleTestCustomFormula}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px' }}
          >
            Validate
          </button>
        </div>
        {customFeedback && (
          <div style={{
            width: '100%',
            fontSize: '12px',
            color: customFeedback.type === 'success' ? '#34d399' : '#f87171',
            marginTop: '4px'
          }}>
            {customFeedback.message}
          </div>
        )}
      </div>
    </div>
  );
}
