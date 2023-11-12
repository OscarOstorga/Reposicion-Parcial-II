import { NavLink } from "react-router-dom";

export function Home() {
    return (
        <>
        <nav className="flex flex-col items-center justify-center h-screen">
            <NavLink to={"categories"} className=" text-center text-white max-w-xl w-screen rounded-md bg-[#1e40af] m-3 p-2">Start Trivia</NavLink>
            <NavLink to={"stats"} className="text-center text-white max-w-xl w-screen rounded-md bg-[#172554] m-3 p-2">Stats</NavLink>
        </nav>
        </>
    );
}