// Comprehensive Excel Formula & Practical Task Evaluator

function normalizeFormula(formula) {
  if (!formula) return '';
  return formula
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '') // remove extra whitespace
    .replace(/^=+/, '='); // ensure single = prefix
}

function evaluateMCQ(userAnswers, mcqBank) {
  let score = 0;
  const breakdown = [];

  mcqBank.forEach((q) => {
    const userSelected = userAnswers[q.id];
    const isCorrect = userSelected === q.correctAnswer;
    if (isCorrect) {
      score += (q.marks || 1);
    }
    breakdown.push({
      id: q.id,
      question: q.question,
      userAnswer: userSelected || 'Not Answered',
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      marksAwarded: isCorrect ? (q.marks || 1) : 0,
      totalMarks: q.marks || 1
    });
  });

  return { score, breakdown };
}

function evaluatePractical(userPracticals, practicalBank) {
  let totalScore = 0;
  const practicalBreakdown = [];

  practicalBank.forEach((problem) => {
    const userSub = userPracticals[problem.id] || {};
    let problemScore = 0;
    const stepBreakdown = [];

    problem.steps.forEach((step) => {
      const userFormula = userSub[step.stepId] || '';
      const normalizedUser = normalizeFormula(userFormula);

      // Check if user matches any accepted formula pattern or exact syntax
      let stepPassed = false;
      let partialCredit = 0;

      for (const accepted of step.acceptedFormulas) {
        const normalizedAccepted = normalizeFormula(accepted);
        if (normalizedUser === normalizedAccepted) {
          stepPassed = true;
          break;
        }
      }

      // Check regex patterns if provided
      if (!stepPassed && step.formulaRegex) {
        try {
          const re = new RegExp(step.formulaRegex, 'i');
          if (re.test(normalizedUser)) {
            stepPassed = true;
          }
        } catch (e) {
          console.error("Regex error:", e);
        }
      }

      // Check partial match (e.g. correct function used and correct range referenced)
      if (!stepPassed && step.requiredKeywords) {
        const hasAllKeywords = step.requiredKeywords.every(kw => 
          normalizedUser.includes(kw.toUpperCase())
        );
        if (hasAllKeywords && normalizedUser.startsWith('=')) {
          // Grant 70% partial credit if core logic is present
          partialCredit = Math.round((step.marks || 5) * 0.7);
        }
      }

      const awarded = stepPassed ? (step.marks || 5) : partialCredit;
      problemScore += awarded;

      stepBreakdown.push({
        stepId: step.stepId,
        instruction: step.instruction,
        userFormula: userFormula || 'No formula entered',
        expectedFormula: step.acceptedFormulas[0],
        passed: stepPassed || partialCredit > 0,
        marksAwarded: awarded,
        totalMarks: step.marks || 5,
        feedback: stepPassed 
          ? '✅ Perfect syntax and cell referencing!' 
          : partialCredit > 0 
            ? `⚠️ Partial credit: Formula logic is correct, standard syntax is: ${step.acceptedFormulas[0]}` 
            : `❌ Incorrect. Recommended Data Analyst approach: ${step.acceptedFormulas[0]}`
      });
    });

    totalScore += problemScore;
    practicalBreakdown.push({
      problemId: problem.id,
      title: problem.title,
      scenario: problem.scenario,
      problemScore,
      totalMarks: problem.totalMarks || 10,
      stepBreakdown
    });
  });

  return { totalScore, practicalBreakdown };
}

module.exports = {
  normalizeFormula,
  evaluateMCQ,
  evaluatePractical
};
