import { useEffect, useState } from "react";


export function Questions(props) {

    const questionIndex = props.selectQuestion - 1;

    const [reRender, setReRender] = useState(true);

    function AnswerButton(props) {

        const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));

        const answer = QuizSubmission[props.ind].answer; 
        const isCorrect = QuizSubmission[props.ind].isTrue;

        if(answer == " ") {

            return(
                <button className="bg-white rounded-md text-left m-2 p-1 px-4 hover:bg-slate-400 hover:text-white"
                    onClick={(e) => props.handleAnswer(e, props.text)}>{props.text}</button>
            )

        } else {

        let color = "bg-white";

        if(props.text == answer) {
            color = isCorrect ? "bg-[#8B9A46]" : "bg-[#541212]";
        }

            return(
                <button className={`${color} rounded-md text-left m-2 p-1 px-4 `}
                    onClick={(e) => props.handleAnswer(e, props.text)} disabled={true}>{props.text}</button>
            )
        }


    }

    function handleAnswer(e, selectedAnswer, correctAnswer) {
        e.preventDefault();

        const correct = verifyAnswer(selectedAnswer, correctAnswer);
        const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));
    
        // Get the index of the currently selected question
        const questionIndex = props.selectQuestion - 1;

        QuizSubmission[questionIndex].answer = selectedAnswer;
        QuizSubmission[questionIndex].isTrue = correct;

        localStorage.setItem("QuizSubmission", JSON.stringify(QuizSubmission));

        setReRender(!reRender);
    
    }


    return (
        <>
            {props.quiz.map( (data, index) => {
                const isSelected = props.selectQuestion == index + 1 ? " " : " hidden";

                let answers = GenerateAnswerBtnsOrder(data, index);

                const answersBtns = <>
                <section className=" grid grid-cols-2 place-content-center grid-flow-row auto-rows-fr">
                    {answers.map((ans) => {
                        return <AnswerButton text={ans} handleAnswer={(e) => handleAnswer(e,ans,data.correct_answer)} ind={index}/>
                    })}
                </section>
                </>

                return(
                    <>
                    <section className={`mx-auto max-w-4xl p-4 m-4 bg-white rounded-md ${isSelected}`}
                    key={index + 1}>
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

function GenerateAnswerBtnsOrder(data, index) {

    const answerOrder = JSON.parse(localStorage.getItem("AnsOrder"));   

    if(answerOrder[index] == null) {

        let tempAns = [removeCharacters(data.correct_answer), removeCharacters(data.incorrect_answers[0])];

        if(data.type == "multiple") {
            tempAns.push(removeCharacters(data.incorrect_answers[1]));
            tempAns.push(removeCharacters(data.incorrect_answers[2]));
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
     
    for(let i = 1; i <= props.length; i++) {
        const displayNum = i > 9 ? "" + i : "0" + i;
        rows.push(
            <button className=" text-xl rounded-xl mx-2 my-4 py-5 px-2" 
                onClick={(e) => props.handleQuestion(e, i)}
                key={i}>{`Q${displayNum}`}</button>
        )
    }

    return(
        <>
        <div className=" flex flex-row justify-center items-center">
        <button className="rounded-xl mx-2 my-4 p-5"
                onClick={(e) => props.handleNextQuestion(e, -1)}>&lt;</button>
            {rows}
        <button className="rounded-xl mx-2 my-4 p-5"
                onClick={(e) => props.handleNextQuestion(e, -2)}>&gt;</button>
        </div>
        </>
    )
}

export function removeCharacters(question) {
    return question.replace(/(&quot;)/g, "\"").replace(/(&rsquo;)/g, "\"").replace(/(&#039;)/g, "'").replace(/(&amp;)/g, "\"");};

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
    return array; 
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