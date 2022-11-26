import Question from "./Question";
import { nanoid } from "nanoid";

function Game(props) {
  let displayQuestions = props.quizData.map((item) => (
    <span className="game--question-container">
      <Question
        key={item.id}
        questionId={item.id}
        correctAnswer={item.correctAnswer}
        question={item.question}
        answers={item.answers}
        quizData={props.quizData}
        setQuizData={props.setQuizData}
        heldAnswer={props.heldAnswer}
        score={props.score}
        setScore={props.setScore}
      />
      <hr />
    </span>
  ));

  return (
    <div className="game--container">
      {displayQuestions}
      {!props.hasCheckedAnswers ? (
        <button
          className="game--check-answers"
          onClick={() => props.checkQuestions()}
        >
          Check Answers
        </button>
      ) : (
        <div className="results--container">
          <h2> you scored {props.score}/5 correct answers</h2>
          <button
            className="game--check-answers"
            onClick={() => props.playAnotherGame()}
          >
            Play Again?
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
