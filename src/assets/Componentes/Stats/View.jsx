import { useEffect, useState } from "react";

export function View() {
  const [partida, setPartida] = useState(null);
  const [back, setBack] = useState(null);
  useEffect(() => {
    const partidaGuardada = localStorage.getItem("Submissions");

    if (partidaGuardada) {
      const datos = JSON.parse(partidaGuardada);
      console.log(datos);
      setPartida(datos[0]);
      console.log(partidaGuardada);
    }
  }, []);

  function handleBack (){
    
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto max-w-4xl p-4 m-4 bg-white rounded-md">
        <div className="flex flex-row m-2">
          <div className="pr-80" onClick={handleBack}>
            <img src="src/assets/img/flecha-pequena-izquierda.png"></img>
          </div>
          <div className="pl-80">
            <p className="text-xl">Attempt Summary</p>
          </div>
        </div>
        <div className="flex-grow">
          {partida ? (
            <ul className="flex flex-col">
              {partida.map((dato, index) => (
                <div key={index} className="my-2 p-2 overflow-hidden flex">
                  <li className="flex items-center">
                    {dato.isTrue ? (
                      <img
                        className="w-5 h-5"
                        src="src/assets/img/controlar.png"
                        alt="Correct"
                      />
                    ) : (
                      <img
                        className="w-4 h-4"
                        src="src/assets/img/cruz.png"
                        alt="Incorrect"
                      />
                    )}
                    <div className="flex flex-col ml-2">
                      <div>
                        <p className="text-xs">
                          Question: {dato.category} -{dato.difficulty}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm"> {dato.question.toString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-col ml-2">
                      <p className="text-xs">Given Answer:</p>
                      <p className="text-sm"> {dato.answer}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No hay registro</p>
          )}
        </div>
      </div>
    </>
  );
}
