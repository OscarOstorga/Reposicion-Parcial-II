import { NavLink } from "react-router-dom";

export function Home() {

    ResetLocalStorage();

    return (
        <>
        <nav>
            <NavLink to={"categories"} className=" bg-slate-500 m-3 p-2">Start Trivia</NavLink>
            <NavLink to={"stats"} className=" bg-slate-500 m-3 p-2">Stats</NavLink>
        </nav>
        </>
    );
}

export function ResetLocalStorage() {
    localStorage.setItem("CurrentQuiz", "");
    localStorage.setItem("Timer", "150");
    localStorage.setItem("AnsOrder", "[]");
    localStorage.setItem("answers", "");
    localStorage.setItem("selectedAnswer", "");
    localStorage.setItem("selectedQuestion", "");
    localStorage.setItem("correctAnswer", "");
}
