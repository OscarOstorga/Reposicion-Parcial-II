import { useParams } from "react-router-dom";


export function Quiz() {
    const catId  = useParams();

    console.log(catId.id)

    return (
        <>
        <div>{catId.id}</div>
        </>
    )
}