import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function Attempts(){


    const data = localStorage.getItem("Submissions");
    const attempts = JSON.parse(data);

    console.log(attempts)

    if(attempts) {
        return(
            <>
            <section className="flex  flex-col items-center justify-center min-h-screen min-w-full">
            <div className=" bg-white m-3 px-40 ">Attempts</div>
            {attempts.map((data, index) => {
    
                let newIndex = index;
    
                if(index + 1 < 100)
                {newIndex = index + 1 < 10 ? "00" + (index + 1): "0" + (index + 1)};
                
    
                return(
                    <>
                    <NavLink to={`/attempts/${index}`} className=" bg-white">
                        <span className=" px-2">{newIndex}</span>
                        <span>{`Attempt: ${data[index].date}`}</span>
                        <span className=" pl-24 px-2">{`Hits`}</span>
                    </NavLink>
                    </>
                )
            })}
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