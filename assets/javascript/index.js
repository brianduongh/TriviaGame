// Declaring variables
    var questions = [
                      "What does Donkey Kong throw at Mario in the first stage?",
                      "In Street Fighter, who is Ryu's rival?",
                      "In Pac-Man, how many ghosts chase you around?",
                      "What is the game called where you shoot at aliens?",
                      "What game makes you dig tunnels and escape monsters?"
                    ];
    var answers = [
                    ["Boxes", "Barrels", "Wheels", "Bananas"],
                    ["Ken", "Akuma", "Sagat", "Dan"],
                    ["5", "4", "3", "2"],
                    ["Alien Shootout", "Galatic Battle", "Space Intruders", "Space Invaders"],
                    ["Dig me out", "Dig Dug", "Gold Digger", "Mine that dirt"]
                  ];

    var correctAnswers = ["Barrels", "Ken", "5", "Space Invaders", "Dig Dug"];
    var intervalId;
    var clockRunning = false;
    var incorrect = 0;
    var correct = 0;
    var unaswered = 0;

    // Document ready
    $(document).ready(function() {
      // User click start button and starts game
      $("#startBtn").on("click", function() {
        // Hide start button and starts game
        $("#startBtn").hide();
        startGame();
      });

      // Initialize game with first question and timer
      function startGame() {
        generateQuestion();
      };

      // Generates a random question
      function generateQuestion() {
        var questionIndex = Math.floor(Math.random() * questions.length);
        // If there are questions in question array, print out the question
        if (typeof questions !== 'undefined' && questions.length > 0) {
          $("#question").text(questions.splice(questionIndex,1));
          generateAnswerChoices(questionIndex);
          timer(questionIndex);
        } else {
          showScore();
        }
      }

      // Creates timer that passes correct answer down
      function timer(correctIndex) {
        var time = 5;
        $("#timer").text(time);
        intervalId = setInterval(count, 1000);

        // Resets the time
        function reset() {
          time = 5;
        }

        // Clears time
        function stop() {
          console.log("stopping");
          clearInterval(intervalId);
        }

        function count() {
          time--;
          $("#timer").text(time);
          // If user runs out of time
          if (time == 0) {
            unaswered++;
            stop();
            reset();
            clearQA();
            showAnswer(correctIndex);
          }
        }
      }

      // Generates answer choices based on question generated
      function generateAnswerChoices(answersIndex) {
        // For each answer, make an answer choice
        answers[answersIndex].forEach(function(answer) {
          var answerChoice = $("<div>");
          answerChoice.addClass("answer");
          answerChoice.attr("id", answer);
          answerChoice.text(answer);
          // Add answers to answerChoice div
          $("#answerChoices").prepend(answerChoice);
        });
        // Removes answers from answers array
        answers.splice(answersIndex, 1);

        // User clicks on answer choice
        $(".answer").on("click", function() {
          // If answer is in the answer array
          if (correctAnswers.indexOf(this.id) > -1) {
            correct++;
            clearQA();
            clearInterval(intervalId);
            showAnswer(answersIndex, correct);
          }
          // If answer is not in answer array
          else {
            incorrect++;
            clearQA();
            clearInterval(intervalId);
            showAnswer(answersIndex, incorrect);
          }
        });
      }

      // Shows answer
      function showAnswer(correctIndex, rightWrong) {
        // If user is correct
        if (rightWrong == correct) {
          $("#result").text("Correct the answer is " + correctAnswers[correctIndex]);
        }
        // If user is incorrect
        else if (rightWrong == incorrect) {
          $("#result").text("Incorrect the answer was " + correctAnswers[correctIndex]);
        }
        // If user runs out of time
        else {
          $("#result").text("Time's up! The answer was " + correctAnswers[correctIndex]);
        }

        // Removes correct answer from array
        correctAnswers.splice(correctIndex, 1);
        // After X amount of seconds, move onto next question
        setTimeout(function() {
          clearQA();
          generateQuestion();
        }, 3000)
      }

      // Shows score
      function showScore() {
        clearQA();
        $("#result").append("Your score");
        $("#result").append("<div>Correct answers: " + correct + "</div>")
        $("#result").append("<div>Incorrect answers: " + incorrect + "</div>");
        $("#result").append("<div>Unaswered answers: " + unaswered + "</div>");
      }


      // Clears divs
      function clearQA() {
        $("#answerChoices").empty();
        $("#question").empty();
        $("#result").empty();
        $("#timer").empty();
      }

    });
