import { useParams } from "react-router-dom";
import fetchQuestions from "../services/services";
import { useEffect, useState } from "react";

    


export function Quiz() {

    const [selectedQuestion, setSelectQuestion] = useState(2);

    const quiz = localStorage.getItem("CurrentQuiz");

    const quizLength = JSON.parse(quiz).length;
    
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);



    function handleQuestion(e, index) {
        e.preventDefault();
        setSelectQuestion(index);
    }

    function handleNextQuestion(e, index){
        e.preventDefault();

        if(index == -1 && selectedQuestion > 1) {
            setSelectQuestion( selectedQuestion - 1);
        } else if(index == -2 && selectedQuestion < quizLength) {
            setSelectQuestion( selectedQuestion + 1);
        }
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
    if(selectedAnswer === correctAnswer){
        //temporizador(5);
    }else{
        //temporizador(-10);
    }
    return selectedAnswer === correctAnswer;

  }


function handleAnswer(e, selectedAnswer, correctAnswer) {
    e.preventDefault();
    const Correct = verifyAnswer(selectedAnswer, correctAnswer);

    localStorage.setItem("correctAnswer", correctAnswers);
    setCorrectAnswers((prevAnswers)=>[...prevAnswers, correctAnswer]);
    localStorage.setItem("answers", JSON.stringify(correctAnswers));
    const correcselectedans = localStorage.getItem("correctAnswer");
    console.log(correcselectedans);

    localStorage.setItem("selectedAnswer", selectedAnswer);
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    localStorage.setItem("answers", JSON.stringify(answers));

    const selectedans = localStorage.getItem("selectedAnswer");
    console.log(selectedans);

  }

  useEffect(()=>{
    console.log("Answers Array: ", answers);
  }, [answers]);

  useEffect(()=>{
    console.log("Correct Answers Array: ", correctAnswers);
  }, [correctAnswers]);

  

    return(
        <>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} 
                handleNextQuestion={handleNextQuestion}/>
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}
                handleAnswer={handleAnswer}/>
        </>
    )
}

function Questions(props) {

    function AnswerButton(props) {
        return(
            <button className=" bg-slate-500 rounded-xl m-2 p-1 px-4" 
                onClick={(e) => props.handleAnswer(e, props.text)}>{props.text}</button>
        )
    }


    return (
        <>
            {props.quiz.map( (data, index) => {
                const isSelected = props.selectQuestion == index + 1 ? " " : " hidden";

                let answers = [data.correct_answer, data.incorrect_answers[0]];
                let answersBtns = "Nothing to see here";

                if(data.type == "multiple") {
                    answers.push(data.incorrect_answers[1]);
                    answers.push(data.incorrect_answers[2]);
                } 

                answers = ShuffleArray(answers);

                answersBtns = <>
                <section className=" grid grid-cols-2 place-content-center grid-flow-row auto-rows-fr">
                    {answers.map((ans) => {
                        return <AnswerButton text={ans} handleAnswer={(e) => props.handleAnswer(e,ans,data.correct_answer)}/>
                    })}
                </section>
                </>

                return(
                    <>
                    <section className={isSelected} key={index + 1}>
                        <div> {index + 1}. {removeCharacters(data.question)}</div>
                        <div> Category: {data.category} --|-- Difficulty: {data.difficulty}</div>  
                    
                    <br />
                        {answersBtns}
                    </section> 
                    </>
                )
            })}
        </>
    )
}


function QuestionNavigation(props) {

    const rows = [];
     
    for(let i = 1; i <= props.length; i++) {
        rows.push(
            <button className=" bg-slate-500 rounded-xl mx-2 my-4 p-5" 
                onClick={(e) => props.handleQuestion(e, i)}
                key={i}>{i}</button>
        )
    }

    return(
        <>
        <div className=" flex flex-row">
        <button className=" bg-slate-500 rounded-xl mx-2 my-4 p-5" 
                onClick={(e) => props.handleNextQuestion(e, -1)}>-</button>
            {rows}
        <button className=" bg-slate-500 rounded-xl mx-2 my-4 p-5" 
                onClick={(e) => props.handleNextQuestion(e, -2)}>+</button>
        </div>
        </>
    )
}

function removeCharacters(question) {
    return question.replace(/(&quot;)/g, "\"").replace(/(&rsquo;)/g, "\"").replace(/(&#039;)/g, "'").replace(/(&amp;)/g, "\"");};

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
    return array; 
}