import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import fetchQuestions from "../services/services";
import { ResetLocalStorage } from "./Home";
import { removeCharacters } from "./Quiz/Questions";

export function Categories() {
  const navigate = useNavigate();
  const colores = ["bg-[#0369a1]", "bg-[#6d28d9]", "bg-[#c2410c]", " bg-[#be123c]"]

  const categories = useLoaderData();

  function handleClick(e, c) {
    e.preventDefault();
    ResetLocalStorage();

    fetchQuestions(c.category).then((data) => {

      const cate = data[0].category;

            
            //Get date
            const date = new Date();
            const dateString = date.toString().slice(0, 16);  

            const temp = data.map((question) => {
              return({quiz: {category: cate, difficulty: question.difficulty, question: removeCharacters(question.question),
                  answer: " ", isTrue: false}, date: dateString})
            })

      localStorage.setItem("CurrentQuiz", JSON.stringify(data))
      localStorage.setItem("QuizSubmission", JSON.stringify(temp));

            navigate("/categories/quiz");
        })
    }



  return (
    <>
      <div className="grid p-4 m-20 grid-cols-3 grid-rows-8 justify-center align-center auto-rows-min mx-auto max-w-2xl ">
        {categories.map((cat, index) => {

          const category = cat.id.toString();
          let colorClass;

          if (index === 2) {
            colorClass = colores[2];
          } else {

            colorClass = colores[index % 4];
          }

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
