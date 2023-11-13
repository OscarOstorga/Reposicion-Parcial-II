import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function Attempts(){


    const data = localStorage.getItem("Submissions");
    const attempts = JSON.parse(data);

    if(attempts) {
        return(
            <>
            <section className="flex  flex-col items-center justify-center min-h-screen min-w-fu">
            <div className="flex flex-col flex-wrap bg-white m-3 px-20 max-w-fit rounded-lg divide-y-reverse divide-y-2">
                <div className=" py-2 flex flex-row justify-center">Attempts</div>
            {attempts.map((data, index) => {
    
                let newIndex = index;
                const questionsAnswered = getCorrectAnswers(data);

                if(index + 1 < 100)
                {newIndex = index + 1 < 10 ? "00" + (index + 1): "0" + (index + 1)};
                
    
                return(
                    <>
                    <NavLink to={`/attempts/${index}`} className=" flex flex-row my-1 min-w-100 justify-between bg-white  hover:bg-slate-300 rounded-md" >
                        <span className="pr-20">
                        <span className=" pr-5">{newIndex}</span>
                        <span>{`Attempt: ${data[index].date}`}</span>
                        </span>

                        <span className=" pl-40 px-2">{`Hits: ${questionsAnswered}/${data.length}`}  </span>
                        <img className="w-3 h-3 pl-0.5 " src="/src/assets/img/play(1).png" alt=">" />
                    </NavLink>
                   
                    </>
                )
            })}
            </div>
            </section>
            </>
        )
    } else {
        return(
            <>
            <section className="flex items-center justify-center min-h-screen min-w-full">
            <div className=" bg-white m-3 px-40 ">Attempts: Empty</div>
            </section>
            </>
        )
    }
}

function getCorrectAnswers(data) {
    let x = 0;
    
    data.forEach((value) => {
        if(value.quiz.isTrue) {
            x = x + 1;
        }
    })

    return x;
}