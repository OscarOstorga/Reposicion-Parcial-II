import { useNavigate } from "react-router-dom";
import fetchQuestions from "../../services/services";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { QuestionNavigation, Questions } from "./Questions";



export function Quiz() {

    const navigate = useNavigate();

    const [selectedQuestion, setSelectQuestion] = useState(1);
    const [reRender, setReRender] = useState(true);
    const [ans, setAns] = useState();
    const [submitted, setSubmitted] = useState(false);

    const quiz = localStorage.getItem("CurrentQuiz");
    const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));
    
    const quizLength = JSON.parse(quiz).length;
    let questionsAnswered = getQuestionsAnswered(QuizSubmission);

    useEffect(() => {
        questionsAnswered = getQuestionsAnswered(QuizSubmission);;
    }, [localStorage.getItem("CurrentQuiz")])



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

    function handleAnswer(e, selectedAnswer, correctAnswer) {
        e.preventDefault();

        const correct = verifyAnswer(selectedAnswer, correctAnswer);
        const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));

    
        // Get the index of the currently selected question
        const questionIndex = selectedQuestion - 1;

        QuizSubmission[questionIndex].quiz.answer = selectedAnswer;
        QuizSubmission[questionIndex].quiz.isTrue = correct;

        localStorage.setItem("QuizSubmission", JSON.stringify(QuizSubmission)); 
        setReRender(!reRender);
        
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

}

    return(
        <>
            <Timer/>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} 
                handleNextQuestion={handleNextQuestion} selectQuestion={selectedQuestion}/>
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}
                setSelectQuestion={setSelectQuestion} handleAnswer={handleAnswer}/>
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


export function getQuestionsAnswered(data) {
    let x = 0;

    data.forEach((value) => {
        if(value.quiz.answer != " ") {
            x = x + 1;
        }
    })

    return x;
}

function verifyAnswer(selectedAnswer, correctAnswer) {
    if(selectedAnswer === correctAnswer){
        const newTime = parseInt(localStorage.getItem("Timer")) + 5;
        console.log(newTime);
        localStorage.setItem("Timer", newTime);

    }else{
        const newTime = parseInt(localStorage.getItem("Timer")) - 10;
        localStorage.setItem("Timer", newTime);
        console.log(newTime);
    }
    return selectedAnswer === correctAnswer;

  }


