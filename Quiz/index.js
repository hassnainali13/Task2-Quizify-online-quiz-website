document.addEventListener('DOMContentLoaded', () => {
  const quizData = [
    {
      question: "What is the correct way to write an HTML comment?",
      options: [
        '<!-- comment -->',
        ' /* comment */',
        '// comment',
        ' #comment'
      ],
      correct: 0,
    },
  
    {
      question: "What does HTML stand for ?",
      options: [
        'Hyper transfer Markup Language',
        'Hypertext machine language',
        'Hypertext Markup Language',
        'Hyperlink and Markup Language'
      ],
      correct: 2,
    },
    {
      question: 'What is the output of the following JavaScript code: 5 == "5"',
      options: [
        'true',
        'false',
        'null',
        'undefined'
      ],
      correct: 0,
    },
  
    {
      question: 'Which CSS property is used to control the spacing  between elements?',
      options: [
        'margin',
        'padding',
        'spacing',
        'border-spacing'
      ],
      correct: 1, // Changed from 1 to 0
    },
  
    {
      question: 'What is the Javascript function used to select an HTML element by its id? ',
      options: [
        'document.query',
        'findElementById',
        'selectElement',
        'document.getElementById'
      ],
      correct: 3,
    },
  ]


  const quiz = document.querySelector('#quiz');
  const answerElm = document.querySelectorAll('.answer');
  const [questionElm, option_1, option_2, option_3, option_4] = document.querySelectorAll("#question , #option_1, #option_2, #option_3, #option_4");
  const submitBtn = document.querySelector('#submit');
  const profileImage = document.querySelector('#profile');
  const usernameDisplay = document.querySelector('#username-display'); // Ensure this element exists

  let currentQuiz = 0;
  let score = 0;

  // Load profile image and username from localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log('UserData:', userData); // Debugging log

  if (userData) {
      if (userData.profileImage) {
          profileImage.src = userData.profileImage;
          console.log('Profile Image URL:', userData.profileImage); // Debugging log
      } else {
          console.log('No profile image found in localStorage');
      }
      if (userData.username) {
          usernameDisplay.textContent = userData.username; // Update username display
      }
  } else {
      console.log('No userData found in localStorage');
  }

  const loadQuiz = () => {
      const { question, options } = quizData[currentQuiz];
      questionElm.innerText = question;

      options.forEach(
          (curOption, index) => (window[`option_${index + 1}`].innerText = curOption)
      );
  };

  const getSelectedOption = () => {
      let answerElement = Array.from(answerElm);
      return answerElement.findIndex((curElem) => curElem.checked);
  }

  const deselectedAnswer = () => {
      answerElm.forEach((curElem) => curElem.checked = false);
  }

  submitBtn.addEventListener("click", () => {
      const selectedOptionIndex = getSelectedOption();

      if (selectedOptionIndex === quizData[currentQuiz].correct) {
          score = score + 1;
      }
      currentQuiz++;
      if (currentQuiz < quizData.length) {
          deselectedAnswer();
          loadQuiz();
      } else {
          if (score >= 3) {
              quiz.innerHTML = `
                  <div class="result">
                  <h2>🏆Your Score: ${score}/${quizData.length} Correct Answers</h2>
                  <p style="color: green;"> <b>Passed 👍</b></p>
                  <p>Congratulations on completing the quiz 🎉</p>
                  <button class="reload-btn" onclick="location.reload()">Play Again </button>
                  </div>
              `;
          } else {
              quiz.innerHTML = `
                  <div class="result">
                  <h2>🏆Your Score: ${score}/${quizData.length} Correct Answers </h2>
                  <p style="color: red;"> <b>Failed 👎</b></p>
                  <p>Try Again and complete the quiz</p>
                  <button class="reload-btn" onclick="location.reload()">Play Again</button>
                  </div>
              `;
          }
      }
  });

  loadQuiz();
});
