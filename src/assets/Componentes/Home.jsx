import { NavLink } from "react-router-dom";

export function Home() {
    return (
        <>
        <nav>
            <NavLink to={"categories"} className=" bg-slate-500 m-3 p-2">Start Trivia</NavLink>
            <NavLink to={"stats"} className=" bg-slate-500 m-3 p-2">Stats</NavLink>
        </nav>
        </>
    );
}