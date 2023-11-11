import axios from "axios";
import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export function Categories() {

    const categories = useLoaderData();

    console.log(categories);    

    return(
        <>
        {categories.map((cat) => {
            console.log(cat.name);
            return (
                <>
                <div className="flex flex-row">
                <NavLink to={cat.id.toString()}  className=" bg-slate-500 m-3 p-2 mb-3">{cat.name}</NavLink>
                </div>
                </>
            )
        })}
        </>
    )

}

export async function CategoriesLoader() {
   const res = await axios.get("https://opentdb.com/api_category.php");
   console.log("hello");
   return res.data.trivia_categories;
}