import { useState, useEffect } from "react";

export default function Timer() {

    const initalTime = parseInt(localStorage.getItem("Timer"));

    const [timeLeft, setTimeLeft] = useState(initalTime);

    let x = 0;
    let time = 0;

    const getTime = () => {
        x = x + 1;
        time = localStorage.getItem("Timer")
        
        setTimeLeft(time - x);
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
    
        return () => clearInterval(interval);
      }, []);



    return(
        <>
        <div>
            Time: {timeLeft}
        </div>
        </>
    );

}