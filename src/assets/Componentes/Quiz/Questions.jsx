import { useEffect, useState } from "react";

export function Questions(props) {
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  function AnswerButton(props) {
    return (
      <button
      className="bg-white rounded-md text-left m-2 p-1 px-4 hover:bg-[#9d174d] hover:text-white"
        onClick={(e) => props.handleAnswer(e, props.text)}
      >
        {props.text}
      </button>
    );
  }

  function handleAnswer(e, selectedAnswer, correctAnswer) {
    e.preventDefault();
    const Correct = verifyAnswer(selectedAnswer, correctAnswer);

    // Get the index of the currently selected question
    const questionIndex = props.selectQuestion - 1;
    console.log("Selected Question Index:", questionIndex);

    localStorage.setItem("correctAnswer", correctAnswers);
    setCorrectAnswers((prevAnswers) => [...prevAnswers, correctAnswer]);
    localStorage.setItem("answers", JSON.stringify(correctAnswers));
    const correcselectedans = localStorage.getItem("correctAnswer");

    localStorage.setItem("selectedAnswer", selectedAnswer);
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    localStorage.setItem("answers", JSON.stringify(answers));
    const selectedans = localStorage.getItem("selectedAnswer");

    console.log("Selected answer: " + selectedAnswer);
    console.log("Correct answer: " + correctAnswer);
  }

  return (
    <>
      {props.quiz.map((data, index) => {
        const isSelected = props.selectQuestion == index + 1 ? " " : " hidden";

        let answers = GenerateAnswerBtnsOrder(data, index);

        const answersBtns = (
          <>
            <section className="flex flex-col">
              {answers.map((ans) => {
                return (
                  <AnswerButton 
                  
                    text={ans}
                    handleAnswer={(e) =>
                      handleAnswer(e, ans, data.correct_answer)
                    }
                  />
                );
              })}
            </section>
          </>
        );

        return (
          <>
            <section
              className={`mx-auto max-w-4xl p-6 m-6 bg-white rounded-md ${isSelected}`}
              key={index + 1}
            >
              <div className="p-2 text-xl">
                {" "}
                {index + 1}. {removeCharacters(data.question)}
              </div>
              <div className="text-sm p-2">
                {" "}
                Category: {data.category} | Difficulty: {data.difficulty}
              </div>

              <br />
              {answersBtns}
            </section>
          </>
        );
      })}
    </>
  );
}

function GenerateAnswerBtnsOrder(data, index) {
  const answerOrder = JSON.parse(localStorage.getItem("AnsOrder"));

  if (answerOrder[index] == null) {
    let tempAns = [data.correct_answer, data.incorrect_answers[0]];

    if (data.type == "multiple") {
      tempAns.push(data.incorrect_answers[1]);
      tempAns.push(data.incorrect_answers[2]);
    }

    tempAns = ShuffleArray(tempAns);
    answerOrder.push(tempAns);

    localStorage.setItem("AnsOrder", JSON.stringify(answerOrder));

    return answerOrder[index];
  } else {
    return answerOrder[index];
  }
}

export function QuestionNavigation(props) {
  const rows = [];

  for (let i = 1; i <= props.length; i++) {
    rows.push(
      <button
        className="rounded-xl mx-2 my-4 p-5"
        onClick={(e) => props.handleQuestion(e, i)}
        key={i}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <div className=" flex flex-row justify-center items-center">
        <button
          className=" rounded-xl mx-2 my-4 p-5"
          onClick={(e) => props.handleNextQuestion(e, -1)}
        >
        -
        </button>
        {rows}
        <button
          className="rounded-xl mx-2 my-4 p-5"
          onClick={(e) => props.handleNextQuestion(e, -2)}
        >
          +
        </button>
      </div>
    </>
  );
}

export function removeCharacters(question) {
  return question
    .replace(/(&quot;)/g, '"')
    .replace(/(&rsquo;)/g, '"')
    .replace(/(&#039;)/g, "'")
    .replace(/(&amp;)/g, '"');
}

function ShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function verifyAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    const newTime = parseInt(localStorage.getItem("Timer")) + 10;
    console.log(newTime);
    localStorage.setItem("Timer", newTime);
  } else {
    const newTime = parseInt(localStorage.getItem("Timer")) - 10;
    localStorage.setItem("Timer", newTime);
    console.log(newTime);
  }
  return selectedAnswer === correctAnswer;
}
