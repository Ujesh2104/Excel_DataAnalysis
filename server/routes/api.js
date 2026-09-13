const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { evaluateMCQ, evaluatePractical } = require('../services/grader');

const storePath = path.join(__dirname, '../data/store.json');

function getStore() {
  const raw = fs.readFileSync(storePath, 'utf8');
  return JSON.parse(raw);
}

function saveStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET all curriculum modules with 5-stage pedagogical data
router.get('/modules', (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, count: store.modules.length, data: store.modules });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single module detail
router.get('/modules/:id', (req, res) => {
  try {
    const store = getStore();
    const mod = store.modules.find(m => m.id === req.params.id);
    if (!mod) {
      return res.status(404).json({ success: false, error: 'Module not found' });
    }
    res.json({ success: true, data: mod });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Practice Solved Cases Hub
router.get('/practice-cases', (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, count: (store.practiceSolvedProblems || []).length, data: store.practiceSolvedProblems || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single Practice Case
router.get('/practice-cases/:id', (req, res) => {
  try {
    const store = getStore();
    const problem = (store.practiceSolvedProblems || []).find(p => p.id === req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Practice problem not found' });
    }
    res.json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Assessment Test package (Sanitized for client - no correct answers or grading logic exposed)
router.get('/test/assessment', (req, res) => {
  try {
    const store = getStore();
    const assessment = store.assessment;

    // Sanitize MCQs: strip correctAnswer and explanation
    const sanitizedMCQs = assessment.mcqs.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      marks: q.marks
    }));

    // Sanitize Practicals: strip acceptedFormulas and regex
    const sanitizedPracticals = assessment.practicals.map(p => ({
      id: p.id,
      title: p.title,
      totalMarks: p.totalMarks,
      scenario: p.scenario,
      tablePreview: p.tablePreview,
      steps: p.steps.map(s => ({
        stepId: s.stepId,
        marks: s.marks,
        instruction: s.instruction
      }))
    }));

    res.json({
      success: true,
      data: {
        totalMarks: assessment.totalMarks,
        mcqMarks: assessment.mcqMarks,
        practicalMarks: assessment.practicalMarks,
        timeLimitMinutes: assessment.timeLimitMinutes,
        mcqs: sanitizedMCQs,
        practicals: sanitizedPracticals
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Submit Test and Auto-grade
router.post('/test/submit', (req, res) => {
  try {
    const { studentName, studentEmail, mcqAnswers, practicalAnswers } = req.body;
    const store = getStore();
    const assessment = store.assessment;

    if (!mcqAnswers && !practicalAnswers) {
      return res.status(400).json({ success: false, error: 'No answers provided for grading' });
    }

    // Grade MCQs
    const mcqResult = evaluateMCQ(mcqAnswers || {}, assessment.mcqs);

    // Grade Practicals
    const practicalResult = evaluatePractical(practicalAnswers || {}, assessment.practicals);

    const totalScore = mcqResult.score + practicalResult.totalScore;
    const maxScore = assessment.totalMarks || 50;
    const percentage = ((totalScore / maxScore) * 100).toFixed(1);

    let performanceGrade = 'Needs Practice';
    let performanceBadge = 'Novice Spreadsheet User';
    if (percentage >= 90) {
      performanceGrade = 'Distinction (Expert Data Analyst)';
      performanceBadge = 'Elite Excel Data Scientist';
    } else if (percentage >= 75) {
      performanceGrade = 'First Class (Advanced Analyst)';
      performanceBadge = 'Senior Excel Specialist';
    } else if (percentage >= 50) {
      performanceGrade = 'Passed (Competent Analyst)';
      performanceBadge = 'Associate Excel Analyst';
    }

    const submissionRecord = {
      id: 'sub-' + Date.now(),
      studentName: studentName || 'Anonymous Student',
      studentEmail: studentEmail || 'student@analyst.edu',
      submittedAt: new Date().toISOString(),
      mcqScore: mcqResult.score,
      practicalScore: practicalResult.totalScore,
      totalScore,
      maxScore,
      percentage: parseFloat(percentage),
      performanceGrade,
      performanceBadge,
      mcqBreakdown: mcqResult.breakdown,
      practicalBreakdown: practicalResult.practicalBreakdown
    };

    // Store submission in backend data store
    store.submissions = store.submissions || [];
    store.submissions.unshift(submissionRecord);
    saveStore(store);

    res.json({
      success: true,
      data: submissionRecord
    });
  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Power BI live sessions
router.get('/powerbi', (req, res) => {
  try {
    const store = getStore();
    res.json({ success: true, data: store.powerBiSessions || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
