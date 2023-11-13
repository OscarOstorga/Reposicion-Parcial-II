import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import fetchQuestions from "../services/services";
import { ResetLocalStorage } from "./Home";

export function Categories() {
  const navigate = useNavigate();
  const colores = ["bg-[#0369a1]","bg-[#6d28d9]","bg-[#c2410c]"," bg-[#be123c]"]

  const categories = useLoaderData();

  function handleClick(e, c) {
    e.preventDefault();
    console.log(c.category);

    fetchQuestions(c.category).then((data) => {
            ResetLocalStorage();
      localStorage.setItem("CurrentQuiz", JSON.stringify(data));

      navigate("/categories/quiz");
    });
  }

  return (
    <>
    <div className="grid p-4 m-20 grid-cols-3 grid-rows-8 justify-center align-center auto-rows-min mx-auto max-w-2xl ">
      {categories.map((cat, index) => {
        
        const category = cat.id.toString();
        const colorClass = colores[index % colores.length];
        
        return (
          <>
              <button
                key={cat.id.toString()}
                className={`text-white ${colorClass} m-4 p-3 mb-3 rounded-md`}
                onClick={(e) => handleClick(e, { category })}
              >
                {cat.name}
              </button>
          </>
        )
      }
      )}
      </div>
    </>
  );
}

export async function CategoriesLoader() {
   const res = await axios.get("https://opentdb.com/api_category.php");
   return res.data.trivia_categories;
}
