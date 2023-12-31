import { data } from "autoprefixer";
import { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router-dom";


export function Questions(props) {

    const questionIndex = props.selectQuestion - 1;
    

    const [reRender, setReRender] = useState(true);

    function AnswerButton(props) {

        const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));

        const answer = QuizSubmission[props.ind].quiz.answer; 

        const isCorrect = QuizSubmission[props.ind].quiz.isTrue;

        if(answer == " ") {

            return(
                <button className="bg-white rounded-md text-left m-2 p-1 px-4 hover:bg-slate-400 hover:text-white"
                    onClick={(e) => props.handleAnswer(e, props.text)}>{props.text}</button>
            )

        } else {

        let color = "bg-white";

        if(props.text == answer) {
            color = isCorrect ? "bg-[#8B9A46]" : "bg-[#9c174c]";
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

        QuizSubmission[questionIndex].quiz.answer = selectedAnswer;
        QuizSubmission[questionIndex].quiz.isTrue = correct;

        localStorage.setItem("QuizSubmission", JSON.stringify(QuizSubmission)); 
        setReRender(!reRender);
        
    }


    return (
        <>
            {props.quiz.map( (data, index) => {
                const isSelected = props.selectQuestion == index + 1 ? " " : " hidden";

                let answers = GenerateAnswerBtnsOrder(data, index);

                const answersBtns = <>
                <section className=" flex flex-col">
                    {answers.map((ans) => {
                        return <AnswerButton text={ans} handleAnswer={(e) => props.handleAnswer(e,ans,data.correct_answer)} ind={index}/>
                    })}
                </section>
                </>

                return(
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
   
    const QuizSubmission = JSON.parse(localStorage.getItem("QuizSubmission"));

     
    for(let i = 1; i <= props.length; i++) {
        const displayNum = i > 9 ? "" + i : "0" + i;

        let color = "";
        let border = "";

        if(QuizSubmission[i - 1].quiz.answer != " ") {
            color = "bg-[#bfdbfe]";
        }

        if(props.selectQuestion == i) {
            border = "border border-[#284ab4]";  
        }

        rows.push(
            <button className={` ${color} ${border} text-xl rounded-xl mx-2 my-4 py-2 px-2 hover:border-y hover:border-[#284ab4]`}
                onClick={(e) => props.handleQuestion(e, i)}
                key={i}>{`Q${displayNum}`}</button>
        )
    }


    return(
        <>
        <div className=" flex flex-row flex-grow-0 justify-center items-center">
        <button className="rounded-xl mx-2 my-4 p-5"
                onClick={(e) => props.handleNextQuestion(e, -1)}>&lt;</button>
            {rows}
        <button className="rounded-xl mx-2 my-4 p-5"
                onClick={(e) => props.handleNextQuestion(e, -2)}>&gt;</button>
        </div>
        </>
    )
}

export function removeCharacters(str) {

    let txt = new DOMParser().parseFromString(str, "text/html");

    return txt.documentElement.textContent;

};

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
    return array; 
} 


