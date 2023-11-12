import { useParams } from "react-router-dom";
import fetchQuestions from "../services/services";
import { useEffect, useState } from "react";

export function Quiz() {
  const [selectedQuestion, setSelectQuestion] = useState(2);

  const quiz = localStorage.getItem("CurrentQuiz");

  const quizLength = JSON.parse(quiz).length;

  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function handleNextQuestion(e, index) {
    e.preventDefault();

    let newSelectedQuestion = selectedQuestion;
    if (index === -1 && selectedQuestion > 1) {
      newSelectedQuestion = selectedQuestion - 1;
    } else if (index === -2 && selectedQuestion < quizLength) {
      newSelectedQuestion = selectedQuestion + 1;
    }

    setSelectQuestion(newSelectedQuestion);

    localStorage.setItem("selectedQuestion", newSelectedQuestion);
  }

  function handleQuestion(e, index) {
    e.preventDefault();
    setSelectQuestion(index);
    localStorage.setItem("selectedQuestion", index);
  }

  //    temporizador(0); xd ya no va
  /*
    function temporizador(time){
        let count = 150+time;
        const timer = setInterval(function(){
        count--;
        console.log(count);
        if (count === 0) {
            clearInterval(timer);
            console.log("Time's up!");
        }
        }, 1000);

    }
*/

  function verifyAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      //temporizador(5);
    } else {
      //temporizador(-10);
    }
    return selectedAnswer === correctAnswer;
  }

  function handleAnswer(e, selectedAnswer, correctAnswer) {
    e.preventDefault();
    const Correct = verifyAnswer(selectedAnswer, correctAnswer);

    // Get the index of the currently selected question
    const questionIndex = selectedQuestion - 1;
    console.log("Selected Question Index:", questionIndex);

    localStorage.setItem("correctAnswer", correctAnswers);
    setCorrectAnswers((prevAnswers) => [...prevAnswers, correctAnswer]);
    localStorage.setItem("answers", JSON.stringify(correctAnswers));
    const correcselectedans = localStorage.getItem("correctAnswer");

    localStorage.setItem("selectedAnswer", selectedAnswer);
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    localStorage.setItem("answers", JSON.stringify(answers));
    const selectedans = localStorage.getItem("selectedAnswer");
  }

  useEffect(() => {
    console.log("Answers Array: ", answers);
  }, [answers]);

  useEffect(() => {
    console.log("Correct Answers Array: ", correctAnswers);
  }, [correctAnswers]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const allData = answers.map((selectedAnswer, index) => ({
      selectedAnswer,
      correctAnswer: correctAnswers[index],
      isCorrect: selectedAnswer === correctAnswers[index],
      questionIndex: index,
    }));
    // Save the combined data to local storage
    localStorage.setItem("submittedData", JSON.stringify(allData));
    console.log("All Submitted Data:", allData);
  }

  const answeredQuestions = answers.length;
  const remainingQuestions = quizLength - answeredQuestions;

  return (
    <>
      <QuestionNavigation
        length={quizLength}
        handleQuestion={handleQuestion}
        handleNextQuestion={handleNextQuestion}
      />
      <Questions
        quiz={JSON.parse(quiz)}
        selectQuestion={selectedQuestion}
        handleAnswer={handleAnswer}
      />
      {submitted ? (
        <p>SUBMIT </p>
      ) : (
        <button
          className="bg-slate-500 rounded-xl mx-2 my-4 p-5"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </>
  );
}

function Questions(props) {
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

  return (
    <>
      {props.quiz.map((data, index) => {
        const isSelected = props.selectQuestion == index + 1 ? " " : " hidden";

        let answers = [data.correct_answer, data.incorrect_answers[0]];
        let answersBtns = "Nothing to see here";

        if (data.type == "multiple") {
          answers.push(data.incorrect_answers[1]);
          answers.push(data.incorrect_answers[2]);
        }

        answers = ShuffleArray(answers);

        answersBtns = (
          <>
            <section className="flex flex-col">
              {answers.map((ans) => {
                return (
                  <AnswerButton
                    text={ans}
                    handleAnswer={(e) =>
                      props.handleAnswer(e, ans, data.correct_answer)
                    }
                  />
                );
              })}
            </section>
          </>
        );

        return (
          <>
            <section className={`mx-auto max-w-4xl p-4 m-4 bg-white rounded-md ${isSelected}`}>
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

function QuestionNavigation(props) {
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
          className="rounded-xl mx-2 my-4 p-5"
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

function removeCharacters(question) {
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
