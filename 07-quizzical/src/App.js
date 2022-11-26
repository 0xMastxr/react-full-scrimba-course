import Intro from "./components/Intro";
import Game from "./components/Game";
// import Answers from "./components/Answers";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import shuffleArray from "./utils";

function App() {
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuizData(formatQuizData(data.results));
      });
  }, [isPlayingGame]);

  console.log(quizData);

  function playAnotherGame() {
    setIsPlayingGame(false);
    setScore(0);
    setHasCheckedAnswers(false);
    setTimeout(() => startGame(), 0);
  }

  function checkQuestions() {
    setScore(0);
    setQuizData((prevData) =>
      prevData.map((item) => {
        let checkedAnswers = item.answers.map((answer) => {
          if (answer.isHeld && item.correctAnswer === answer.value) {
            // add green box property when the player got the correct answer
            setScore((prevScore) => prevScore + 1);
            return {
              ...answer,
              isCheckedCorrect: true,
            };
            // display red box property on the incorrect player answer
          } else if (answer.isHeld && item.correctAnswer !== answer.value) {
            return {
              ...answer,
              isCheckedWrong: true,
            };
            // display green box property on the correct answer when player guessed wrong
          } else if (!answer.isHeld && item.correctAnswer === answer.value) {
            return {
              ...answer,
              isCheckedCorrect: true,
            };
          } else {
            // display faded box if answer is not a player selection and/or correct answer
            return {
              ...answer,
              isFaded: true,
            };
          }
        });
        return {
          ...item,
          answers: checkedAnswers,
        };
      })
    );
    setHasCheckedAnswers(true);
  }

  function heldAnswer(answerId, questionId) {
    setQuizData((prevQuestions) =>
      prevQuestions.map((item) => {
        if (item.id === questionId) {
          let newAnswersArray = item.answers.map((answer) => {
            if (answer.id === answerId) {
              return {
                ...answer,
                isHeld: true,
              };
            } else {
              return {
                ...answer,
                isHeld: false,
              };
            }
          });
          return {
            ...item,
            answers: newAnswersArray,
          };
        } else {
          return item;
        }
      })
    );
  }

  function formatQuizData(questionsArray) {
    let formattedData = questionsArray.map((item) => {
      return {
        id: nanoid(),
        question: item.question,
        correctAnswer: item.correct_answer,
        answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
        score: 0,
      };
    });

    return formattedData;
  }

  function startGame() {
    setIsPlayingGame(true);
  }

  return (
    <div>
      {!isPlayingGame ? (
        <Intro startGame={startGame} />
      ) : (
        <Game
          quizData={quizData}
          setQuizData={setQuizData}
          key={nanoid()}
          hasCheckedAnswers={hasCheckedAnswers}
          setHasCheckedAnswers={setHasCheckedAnswers}
          heldAnswer={heldAnswer}
          checkQuestions={checkQuestions}
          score={score}
          setScore={setScore}
          playAnotherGame={playAnotherGame}
        />
      )}
    </div>
  );
}

export default App;
