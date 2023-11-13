import { useParams } from "react-router-dom";
import fetchQuestions from "../../services/services";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { QuestionNavigation, Questions } from "./Questions";




export function Quiz() {

    const [selectedQuestion, setSelectQuestion] = useState(1);

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
  

    return(
        <>
            <Timer/>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} handleNextQuestion={handleNextQuestion} />
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}/>
            {submitted ? (
                <p>SUBMIT</p>
            ) : (
                <button className="bg-slate-500 rounded-xl mx-2 my-4 p-5" onClick={handleSubmit}>
                    Submit
                </button>
            )}
        </>
    )
}


