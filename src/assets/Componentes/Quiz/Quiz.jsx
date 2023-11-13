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

    let submissions = localStorage.getItem("Submissions");
    const newSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));

    if(submissions == null) {
        submissions = [];
    } else {
        submissions = JSON.parse(submissions);
    }

    submissions.push(newSubmission);

    localStorage.setItem("Submissions", JSON.stringify(submissions));

    console.log(submissions);
}

    return(
        <>
            <Timer/>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} handleNextQuestion={handleNextQuestion} />
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}/>
            {submitted ? (
                <p className="bg-slate-500 rounded-xl mx-2 my-4 p-5">SUBMIT</p>
            ) : (
                <button className="bg-slate-500 rounded-xl mx-2 my-4 p-5" onClick={handleSubmit}>
                    {`Submit 0/${quizLength}`}
                </button>
            )}
        </>
    )
}



