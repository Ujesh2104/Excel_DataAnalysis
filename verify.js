async function testAll() {
  console.log('--- 1. Testing Modules Endpoint with 5-Stage Data ---');
  const modRes = await fetch('http://localhost:5000/api/modules');
  const modData = await modRes.json();
  console.log('Modules Count:', modData.count, 'Success:', modData.success);
  console.log('Module 1 Definition present?', !!modData.data[0].definition);
  console.log('Module 1 Visual Flow present?', !!modData.data[0].visualFlow);
  console.log('Module 1 Progressive Examples Count:', modData.data[0].progressiveExamples?.length);

  console.log('\n--- 2. Testing Solved Practice Cases Endpoint ---');
  const practiceRes = await fetch('http://localhost:5000/api/practice-cases');
  const practiceData = await practiceRes.json();
  console.log('Practice Cases Count:', practiceData.count, 'Success:', practiceData.success);
  console.log('First Practice Case Title:', practiceData.data[0]?.title);
  console.log('Analyst Thinking Blueprint Phases:', practiceData.data[0]?.analystThinkingBlueprint?.length);

  console.log('\n--- 3. Testing Assessment API (Sanitized) ---');
  const testRes = await fetch('http://localhost:5000/api/test/assessment');
  const testData = await testRes.json();
  console.log('MCQs Count:', testData.data.mcqs.length, 'Practicals Count:', testData.data.practicals.length);
  console.log('First MCQ has correctAnswer leaked?', !!testData.data.mcqs[0].correctAnswer);

  console.log('\n--- 4. Testing Auto-Grading Submission ---');
  const submitRes = await fetch('http://localhost:5000/api/test/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentName: 'Aarav Mehta',
      studentEmail: 'aarav.mehta@analystcorp.com',
      mcqAnswers: {
        'mcq-1': '$A$1',
        'mcq-2': 'There are invisible trailing non-breaking spaces (CHAR 160 or ASCII 32)',
        'mcq-3': 'XLOOKUP can perform lookups to the left without altering column order',
        'mcq-4': '#SPILL!',
        'mcq-5': 'Sums column D for rows where Region is North AND value in column B is greater than 50,000'
      },
      practicalAnswers: {
        'prac-1': {
          'p1-s1': '=XLOOKUP(B5, Catalog!B2:B100, Catalog!A2:A100, "Invalid SKU")',
          'p1-s2': '=XLOOKUP(B5, Catalog!B2:B100, Catalog!D2:D100, 0)',
          'p1-s3': '=IF(E5>=4, (D5*E5)*0.9, D5*E5)'
        }
      }
    })
  });
  const submitData = await submitRes.json();
  console.log('Submission Result Score:', submitData.data.totalScore, '/', submitData.data.maxScore, 'Grade:', submitData.data.performanceGrade);

  console.log('\n--- 5. Testing Admin Auth for ujeshmishra@gmail.com ---');
  const adminRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'ujeshmishra@gmail.com', password: 'secretpassword' })
  });
  const adminData = await adminRes.json();
  console.log('Admin Auth Success:', adminData.success, 'Role:', adminData.admin?.role);

  console.log('\n--- 6. Testing Admin Analytics ---');
  const analyticsRes = await fetch('http://localhost:5000/api/admin/analytics');
  const analyticsData = await analyticsRes.json();
  console.log('Total Submissions Tracked:', analyticsData.stats.totalAttempts, 'Pass Rate:', analyticsData.stats.passRate);
}

testAll().catch(console.error);
