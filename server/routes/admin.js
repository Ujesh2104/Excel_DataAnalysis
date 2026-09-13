const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '../data/store.json');

function getStore() {
  const raw = fs.readFileSync(storePath, 'utf8');
  return JSON.parse(raw);
}

function saveStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');
}

// Admin / Teacher Login verification
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const store = getStore();

    const normalizedEmail = (email || '').trim().toLowerCase();

    // Check if the user is the authorized Admin/Teacher
    if (normalizedEmail !== 'ujeshmishra@gmail.com') {
      return res.status(403).json({
        success: false,
        error: 'Access Denied: Only ujeshmishra@gmail.com holds Admin and Teacher Dashboard privileges. Other users have Student access.'
      });
    }

    // Return token and admin profile
    const token = 'admin-jwt-' + Buffer.from(email + ':' + Date.now()).toString('base64');
    
    res.json({
      success: true,
      token,
      admin: {
        email: store.admin.email,
        name: store.admin.name,
        role: store.admin.role,
        permissions: [
          'MANAGE_TESTS',
          'CREATE_POWER_BI_SESSIONS',
          'VIEW_STUDENT_ANALYTICS',
          'CURRICULUM_MANAGEMENT'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Dashboard Analytics & Student Submissions
router.get('/analytics', (req, res) => {
  try {
    const store = getStore();
    const submissions = store.submissions || [];
    
    const totalAttempts = submissions.length;
    const averageScore = totalAttempts > 0 
      ? (submissions.reduce((acc, curr) => acc + curr.totalScore, 0) / totalAttempts).toFixed(1)
      : 0;

    const passCount = submissions.filter(s => s.percentage >= 50).length;
    const passRate = totalAttempts > 0 ? ((passCount / totalAttempts) * 100).toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        totalAttempts,
        averageScore,
        passRate,
        totalModules: store.modules.length,
        totalPowerBiSessions: (store.powerBiSessions || []).length
      },
      recentSubmissions: submissions.slice(0, 30)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Add New Power BI Session (Teacher Dashboard)
router.post('/powerbi/create', (req, res) => {
  try {
    const { title, instructor, date, duration, level, meetLink, datasetDownload, description, agenda } = req.body;
    
    if (!title || !date) {
      return res.status(400).json({ success: false, error: 'Title and Date are required' });
    }

    const store = getStore();
    const newSession = {
      id: 'pbi-' + Date.now(),
      title,
      instructor: instructor || 'Ujesh Mishra',
      date,
      duration: duration || '60 mins',
      level: level || 'All Levels',
      meetLink: meetLink || 'https://meet.google.com/excel-mastery',
      datasetDownload: datasetDownload || 'PowerBI_Exercise_Data.xlsx',
      description: description || 'Interactive live session covering modern analytics workflows.',
      agenda: Array.isArray(agenda) ? agenda : (agenda ? [agenda] : ['Hands-on DAX and Modeling'])
    };

    store.powerBiSessions = store.powerBiSessions || [];
    store.powerBiSessions.push(newSession);
    saveStore(store);

    res.json({ success: true, message: 'Power BI session scheduled successfully', session: newSession });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Power BI Session
router.delete('/powerbi/:id', (req, res) => {
  try {
    const store = getStore();
    store.powerBiSessions = (store.powerBiSessions || []).filter(s => s.id !== req.params.id);
    saveStore(store);
    res.json({ success: true, message: 'Power BI session deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Add or Update MCQ in Assessment Test Bank (Admin / Teacher Dashboard)
router.post('/test/mcq', (req, res) => {
  try {
    const { question, options, correctAnswer, explanation, marks } = req.body;
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ success: false, error: 'Question, Options, and Correct Answer are required' });
    }

    const store = getStore();
    const newMCQ = {
      id: 'mcq-' + (store.assessment.mcqs.length + 1),
      question,
      options,
      correctAnswer,
      explanation: explanation || 'Standard formula calculation rule.',
      marks: marks ? parseInt(marks) : 1
    };

    store.assessment.mcqs.push(newMCQ);
    saveStore(store);

    res.json({ success: true, message: 'MCQ added to Test Bank', question: newMCQ });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
