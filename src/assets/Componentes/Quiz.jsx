import { useParams } from "react-router-dom";
import fetchQuestions from "../services/services";
import { useState } from "react";


export function Quiz() {

    const [selectedQuestion, setSelectQuestion] = useState(1);

    const quiz = localStorage.getItem("CurrentQuiz");

    console.log(quiz);

    const quizLength = JSON.parse(quiz).length;

    function handleQuestion(e, index) {
        e.preventDefault();
        console.log(index);

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

    function handleAnswer(e, answer){

    }

    return(
        <>
            <QuestionNavigation length={quizLength} handleQuestion={handleQuestion} 
                handleNextQuestion={handleNextQuestion}/>
            <Questions quiz={JSON.parse(quiz)} selectQuestion={selectedQuestion}/>
        </>
    )
}

function Questions(props) {
    
    let x = 1;
    function AnswerButton(props) {
        return(
            <>
            <button className=" bg-slate-500 rounded-xl m-2 p-1 px-4" 
                onClick={(e) => props.handleQuestion(e, text)}>{props.text}</button>
            </>
        )
    }

    return (
        <>
            {props.quiz.map( (data) => {
                const isSelected = props.selectQuestion == x ? " " : " hidden";

                let answers;


                return(
                    <>
                    <section className={isSelected} key={x}>
                        <div> {x++}. {removeCharacters(data.question)}</div>
                        <div> Category: {data.category} --|-- Difficulty: {data.difficulty}</div>  
                    
                    <br />

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