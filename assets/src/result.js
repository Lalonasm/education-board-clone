const markSheet = document.getElementById("mark-sheet");

// get search result
const searchData = JSON.parse(localStorage.getItem("searchData"));
if (!searchData) {
  window.location.href = "/index.html";
}

const getGradeAndGPA = (mark) => {
  let grade;
  let gpa;

  if (mark >= 0 && mark < 33) {
    grade = "F";
    gpa = 0;
  } else if (mark >= 33 && mark < 40) {
    grade = "D";
    gpa = 1;
  } else if (mark >= 40 && mark < 50) {
    grade = "C";
    gpa = 2;
  } else if (mark >= 50 && mark < 60) {
    grade = "B";
    gpa = 3;
  } else if (mark >= 60 && mark < 70) {
    grade = "A-";
    gpa = 3.5;
  } else if (mark >= 70 && mark < 80) {
    grade = "A";
    gpa = 4;
  } else if (mark >= 80 && mark <= 100) {
    grade = "A+";
    gpa = 5;
  } else {
    grade = "invalid";
    gpa = "invalid";
  }

  return {
    gpa: gpa,
    grade: grade,
  };
};

const resultSystemPro = (marks) => {
  const { bangla, english, math, science, social, reli } = marks;

  const totalGpaAvg = (
    (getGradeAndGPA(bangla).gpa +
      getGradeAndGPA(english).gpa +
      getGradeAndGPA(math).gpa +
      getGradeAndGPA(science).gpa +
      getGradeAndGPA(social).gpa +
      getGradeAndGPA(reli).gpa) /
    6
  ).toFixed(2);

  if (
    bangla >= 33 &&
    english >= 33 &&
    math >= 33 &&
    science >= 33 &&
    social >= 33 &&
    reli >= 33
  ) {
    if (totalGpaAvg >= 0 && totalGpaAvg < 1) {
      return {
        gpa: totalGpaAvg,
        grade: "F",
      };
    } else if (totalGpaAvg >= 1 && totalGpaAvg < 2) {
      return {
        gpa: totalGpaAvg,
        grade: "D",
      };
    } else if (totalGpaAvg >= 2 && totalGpaAvg < 3) {
      return {
        gpa: totalGpaAvg,
        grade: "C",
      };
    } else if (totalGpaAvg >= 3 && totalGpaAvg < 3.5) {
      return {
        gpa: totalGpaAvg,
        grade: "B",
      };
    } else if (totalGpaAvg >= 3.5 && totalGpaAvg < 4) {
      return {
        gpa: totalGpaAvg,
        grade: "A-",
      };
    } else if (totalGpaAvg >= 4 && totalGpaAvg < 5) {
      return {
        gpa: totalGpaAvg,
        grade: "A",
      };
    } else if (totalGpaAvg >= 5) {
      return {
        gpa: totalGpaAvg,
        grade: "A+",
      };
    }
  } else {
    return {
      gpa: 0,
      grade: "F",
    };
  }
};

markSheet.innerHTML = `
<div class="result-sheet">
<h2>SSC/Dakhil/Equivalent Result 2015</h2>
<div class="edu-student-info">
  <table>
    <tr>
      <td>Roll No</td>
      <td>${searchData.roll}</td>
      <td>Name</td>
      <td>${searchData.name}</td>
    </tr>
    <tr></tr>
    <tr>
      <td>Board</td>
      <td>${searchData.board}</td>
      <td>Father's Name</td>
      <td>${searchData.father}</td>
    </tr>
    <tr>
      <td>Group</td>
      <td>${searchData.group}</td>
      <td>Mother's Name</td>
      <td>${searchData.mother}</td>
    </tr>
    <tr>
      <td>Type</td>
      <td>${searchData.type}</td>
      <td>Date of Birth</td>
      <td>${searchData.dob}</td>
    </tr>
   
    <tr>
      <td>Result</td>
      <td>${resultSystemPro({
  bangla: searchData.results.bangla,
  english: searchData.results.english,
  math: searchData.results.math,
  science: searchData.results.science,
  social: searchData.results.social,
  reli: searchData.results.religion,
}).grade
  }</td>
      <td>Institute</td>
      <td>${searchData.inst}</td>
    </tr>
     <tr>
      <td>GPA</td>
      <td colspan="3">${resultSystemPro({
    bangla: searchData.results.bangla,
    english: searchData.results.english,
    math: searchData.results.math,
    science: searchData.results.science,
    social: searchData.results.social,
    reli: searchData.results.religion,
  }).gpa
  }</td>
    </tr>
  </table>
</div>

<h2>Grade Sheet</h2>
<div class="edu-student-grade-sheet">
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Subject</th>
        <th>Grade</th>
        <th>GPA</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>101</td>
        <td>BANGLA</td>
         <td>${getGradeAndGPA(searchData.results.bangla).grade}</td>
        <td>${getGradeAndGPA(searchData.results.bangla).gpa}</td>
       
      </tr>
      <tr>
        <td>102</td>
        <td>ENGLISH</td>
        <td>${getGradeAndGPA(searchData.results.english).grade}</td>
        <td>${getGradeAndGPA(searchData.results.english).gpa}</td>
       
      </tr>
      <tr>
        <td>103</td>
        <td>MATHEMATICS</td>
         <td>${getGradeAndGPA(searchData.results.math).grade}</td>
        <td>${getGradeAndGPA(searchData.results.math).gpa}</td>
       
      </tr>
      <tr>
        <td>104</td>
        <td>SCIENCE</td>
         <td>${getGradeAndGPA(searchData.results.science).grade}</td>
        <td>${getGradeAndGPA(searchData.results.science).gpa}</td>
       
      </tr>
      <tr>
        <td>105</td>
        <td>SOCIAL SCIENCE</td>
         <td>${getGradeAndGPA(searchData.results.social).grade}</td>
        <td>${getGradeAndGPA(searchData.results.social).gpa}</td>
      
      </tr>
      <tr>
        <td>106</td>
        <td>RELIGION</td>
         <td>${getGradeAndGPA(searchData.results.religion).grade}</td>
        <td>${getGradeAndGPA(searchData.results.religion).gpa}</td>
      
      </tr>
    </tbody>
  </table>
  <a href="#" onclick="goToSearchPage()">Search Again</a>
</div>
</div>

`;

const goToSearchPage = () => {
  localStorage.removeItem("searchData");
  window.location.href = "index.html";
};