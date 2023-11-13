import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import fetchQuestions from "../services/services";
import { ResetLocalStorage } from "./Home";

export function Categories() {

    const navigate = useNavigate();

    function handleClick(e, c) {
        e.preventDefault();
        console.log(c.category);

        fetchQuestions(c.category).then( (data) => {
            ResetLocalStorage();
            localStorage.setItem("CurrentQuiz", JSON.stringify(data))

            navigate("/categories/quiz");
        })
    }

    const categories = useLoaderData();  

    return(
        <>
        {categories.map((cat) => {
            const category = cat.id.toString();
            return (
                <>
                <div className="flex flex-row" key={category}>
                <button className=" bg-slate-500 m-3 p-2 mb-3" onClick={(e) =>handleClick(e, {category})}>{cat.name}</button>
                </div>
                </>
            )
        })}
        </>
    )

}

export async function CategoriesLoader() {
   const res = await axios.get("https://opentdb.com/api_category.php");
   return res.data.trivia_categories;
}