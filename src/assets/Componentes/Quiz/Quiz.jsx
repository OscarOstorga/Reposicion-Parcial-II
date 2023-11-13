import { useNavigate } from "react-router-dom";
import fetchQuestions from "../../services/services";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { QuestionNavigation, Questions } from "./Questions";



export function Quiz() {

    const navigate = useNavigate();

    const [selectedQuestion, setSelectQuestion] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [reRender, GetReRendered] = useState(true);

    const quiz = localStorage.getItem("CurrentQuiz");
    const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));
    
    const quizLength = JSON.parse(quiz).length;
    const questionsAnswered = getQuestionsAnswered(QuizSubmission);
    



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
    navigate("/");

    console.log(submissions);
}

    return(
        <>
            <Timer/>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} 
                handleNextQuestion={handleNextQuestion} selectQuestion={selectedQuestion}/>
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}
                setSelectQuestion={setSelectQuestion}/>
            {submitted ? (
                <p className="flex items-center justify-center mx-auto max-w-xs w-screen text-gray-300 bg-[#9d174d] rounded-xl mx-2 my-4 p-5">SUBMIT</p>
            ) : (
                <button className="flex items-center justify-center mx-auto max-w-xs w-screen text-gray-300 bg-[#9d174d] rounded-xl mx-2 my-4 p-5" onClick={handleSubmit}>
                    {`Submit ${questionsAnswered}/${quizLength}`}
                </button>
            )}
        </>
    )
}


function getQuestionsAnswered(data) {
    let x = 0;

    data.forEach((value) => {
        if(value.quiz.answer != " ") {
            x = x + 1;
        }
    })

    return x;
}


