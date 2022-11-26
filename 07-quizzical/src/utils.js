import { nanoid } from "nanoid";

function shuffleAnswers(possibleAnswers) {
  let randomArr = [...possibleAnswers].sort(() => Math.random() - 0.5);
  let randomAnswerList = randomArr.map((item) => {
    return {
      value: item,
      id: nanoid(5),
      isHeld: false,
    };
  });
  return randomAnswerList;
}

export default shuffleAnswers;
