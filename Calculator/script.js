function createSubjectInputs() {
  const numSubjects = parseInt(document.getElementById('numSubjects').value);
  const marksPerSubject = parseFloat(document.getElementById('marksPerSubject').value);
  const qualifyingMarks = parseFloat(document.getElementById('qualifyingMarks').value);

  // Validate inputs
  if (isNaN(numSubjects) || numSubjects < 1) {
    alert("Please enter a valid number of subjects.");
    return;
  }

  if (isNaN(marksPerSubject) || marksPerSubject <= 0) {
    alert("Please enter valid marks for one subject.");
    return;
  }

  if (isNaN(qualifyingMarks) || qualifyingMarks <= 0 || qualifyingMarks > marksPerSubject) {
    alert("Please enter valid qualifying marks (must be less than or equal to marks per subject).");
    return;
  }

  // Clear previous inputs
  const subjectInputs = document.getElementById('subjectInputs');
  subjectInputs.innerHTML = "";

  // Create input fields for obtained marks of each subject
  for (let i = 1; i <= numSubjects; i++) {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';

    const label = document.createElement('label');
    label.textContent = `Subject ${i} Obtained Marks:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `subject${i}Obtained`;
    input.placeholder = 'Enter obtained marks';

    subjectDiv.appendChild(label);
    subjectDiv.appendChild(input);
    subjectInputs.appendChild(subjectDiv);
  }

  // Show the Calculate Grade button
  document.getElementById('calculateBtn').style.display = 'block';
}

function calculateGrade() {
  const numSubjects = parseInt(document.getElementById('numSubjects').value);
  const marksPerSubject = parseFloat(document.getElementById('marksPerSubject').value);
  const qualifyingMarks = parseFloat(document.getElementById('qualifyingMarks').value);
  let totalObtained = 0;
  let isPass = true;

  // Validate inputs
  if (isNaN(marksPerSubject) || marksPerSubject <= 0) {
    alert("Please enter valid marks for one subject.");
    return;
  }

  if (isNaN(qualifyingMarks) || qualifyingMarks <= 0 || qualifyingMarks > marksPerSubject) {
    alert("Please enter valid qualifying marks.");
    return;
  }

  // Calculate total obtained marks and check if the student passed all subjects
  for (let i = 1; i <= numSubjects; i++) {
    const obtained = parseFloat(document.getElementById(`subject${i}Obtained`).value) || 0;
    if (obtained < 0 || obtained > marksPerSubject) {
      alert(`Error: Obtained marks for Subject ${i} must be between 0 and ${marksPerSubject}.`);
      return;
    }
    if (obtained < qualifyingMarks) {
      isPass = false; // Student failed this subject
    }
    totalObtained += obtained;
  }

  // Calculate percentage
  const totalMarks = numSubjects * marksPerSubject;
  const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);

  // Determine grade
  let grade;
  if (percentage >= 90) {
    grade = 'A+';
  } else if (percentage >= 80) {
    grade = 'A';
  } else if (percentage >= 70) {
    grade = 'B';
  } else if (percentage >= 60) {
    grade = 'C';
  } else if (percentage >= 50) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  // Determine pass/fail status
  const status = isPass ? "Pass" : "Fail";

  // Display results
  document.getElementById('totalObtained').textContent = totalObtained;
  document.getElementById('percentage').textContent = percentage;
  document.getElementById('grade').textContent = grade;
  document.getElementById('status').textContent = status;
}
