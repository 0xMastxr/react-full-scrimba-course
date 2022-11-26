function Intro(props) {
  //   console.log(props);
  return (
    <div className="intro--container">
      <div className="intro--display">
        <h2 className="intro--title">Quizzical</h2>
        <p className="intro--description">Let's play a game!!</p>
        <button className="intro--button" onClick={props.startGame}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Intro;
