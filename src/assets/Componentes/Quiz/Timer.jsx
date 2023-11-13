import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function Timer() {
    const navigate = useNavigate();

    const initalTime = parseInt(localStorage.getItem("Timer"));

    const [timeLeft, setTimeLeft] = useState(initalTime);

    let x = 0;
    let time = 0;

    function Submit() {
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

    const getTime = () => {
        x = x + 1;
        time = localStorage.getItem("Timer")
        
        setTimeLeft(time - x);
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
    
        return () => clearInterval(interval);
      }, []);

    useEffect(()=>{
        if(timeLeft <= 0) {
            Submit();
        }
    }, [timeLeft])


    return(
        <>
        <div className="flex items-center justify-center text-xl m-6 p-6">
            Time: {timeLeft}
        </div>
        </>
    );

}