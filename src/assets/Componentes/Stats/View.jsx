import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function View() {
  const navigate = useNavigate();

  const {id } = useParams();

  const [partida, setPartida] = useState(null);
  const [back, setBack] = useState(null);
  useEffect(() => {
    const partidaGuardada = localStorage.getItem("Submissions");

    if (partidaGuardada) {
      const datos = JSON.parse(partidaGuardada);
      console.log(datos[id]);
      setPartida(datos[id]);
    }
  }, []);

  function handleBack (){
    navigate("/attempts");  
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto max-w-4xl p-4 m-4 bg-white rounded-md">
        <div className="flex flex-row m-2">
          <div className="pr-80" onClick={handleBack}>
            <img src="/src/assets/img/flecha-pequena-izquierda.png" alt="<--" className=" hover:bg-[#e2e8f0] rounded-md">
            </img>
          </div>
          <div className="pl-80">
            <p className="text-xl">Attempt Summary</p>
          </div>
        </div>
        <div className="flex flex-col">
          {partida ? (
            <div className="flex flex-col">
              {partida.map((dato, index) => (
                <div key={index} className="grid grid-cols-3 gap-5 pb-4">
                  <div className="flex items-center col-span-2 grow-0">
                    {dato.quiz.answer == " " ? (
                        <img
                        className="w-5 h-5"
                        src="/src/assets/img/minus.png"
                        alt="None"
                        />
                    ) : ( dato.quiz.isTrue ? (
                      <img
                        className="w-5 h-5"
                        src="/src/assets/img/controlar.png"
                        alt="Correct"
                      />
                    ) : (
                      <img
                        className="w-4 h-4"
                        src="/src/assets/img/cruz.png"
                        alt="Incorrect"
                      />
                    ))}
                    <div className="flex flex-col ml-2 max-w-md min-w-md">
                      <div>
                        <p className="text-xs">
                          Question: {dato.quiz.category} -{dato.quiz.difficulty}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm"> {dato.quiz.question.toString()}</p>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-col ml-2 pr-3 basis-50 grow-0">

                      <p className="text-xs">Given Answer:</p>
                      <p className="text-sm"> {dato.quiz.answer}</p>

                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay registro</p>
          )}
        </div>
      </div>
    </>
  );
}
