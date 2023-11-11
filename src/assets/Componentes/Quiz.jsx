import { useParams } from "react-router-dom";
import fetchQuestions from "../services/services";


export function Quiz() {

    const quiz = localStorage.getItem("CurrentQuiz");

    
    console.log(JSON.parse(quiz)[0].question);

    let x = 1;

    return(
        <>
            {JSON.parse(quiz).map((data)=>{

                return (
                <>
                <div> {x++}. {removeCharacters(data.question)}</div>
                <div>Category: {data.category}</div>
                <div>Difficulty: {data.difficulty}</div> 
                <br />
                </>
                );
            })}
        </>
    )
}

function removeCharacters(question) {
    return question.replace(/(&quot;)/g, "\"").replace(/(&rsquo;)/g, "\"").replace(/(&#039;)/g, "'").replace(/(&amp;)/g, "\"");};