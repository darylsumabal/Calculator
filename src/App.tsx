import { useEffect, useState } from "react";
import { inputValue } from "./constant/data";
import Button from "./components/Button";

type HistoryValue = {
  value: string;
  ans: string;
};

function App() {
  const [result, setShowResult] = useState<boolean>(false);
  const [display, setDisplay] = useState<string>("");
  const [history, setShowHistory] = useState<boolean>(false);
  const [t, setT] = useState<HistoryValue[]>([{ value: "", ans: "" }]);
  const maxLimit = 15;

  //use to get the value from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("score");
    if (savedHistory) {
      setT(JSON.parse(savedHistory));
    }
  }, []);

  const calculateResult = () => {
    if (display.length !== 0) {
      try {
        let calcResult = eval(display);
        //maximum of 3decimal
        calcResult = parseFloat(calcResult.toFixed(3));

        setDisplay(calcResult);

        setT((prev) => [{ value: display, ans: calcResult }, ...prev]);
        localStorage.setItem("score", JSON.stringify(t));
        setShowResult(true);
      } catch (error) {
        setDisplay("ERROR" + error);
      }
    } else setDisplay("");
  };

  //use to click handle the button click and get the value
  const handleButton = (value: string) => {
    console.log(value);
    setShowResult(false);

    if (value === "AC") setDisplay("");
    else if (value === "HISTORY") setShowHistory(!history);
    else if (value === "C") setDisplay(display.slice(0, -1));
    else if (isOperator(value)) {
      if (display == "" || isOperator(display[display.length - 1])) return;
      setDisplay(display + value);
    } else if (value === "EQUALS") calculateResult();
    else if (display.length >= maxLimit)
      alert(`maximum character allowed ${maxLimit}`);
    else setDisplay(display + value);
  };

  const isOperator = (char: string) => {
    return ["*", "/", "%"].includes(char);
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-slate-950  h-screen">
      <div className="bg-white p-2 ring-1 rounded-sm ease-in duration-150 shadow-lg shadow-emerald-600 hover:shadow-red-600 w-72 sm:w-96">
        <div className="flex flex-col justify-center items-center gap-2 relative">
          <div className="h-28 flex flex-col justify-end items-end bg-slate-600  w-full rounded-sm  p-4">
            <div
              className={`${
                result ? "text-4xl" : "text-2xl tracking-widest"
              } text-slate-100 font-medium`}
            >
              <div>{display}</div>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="grid grid-cols-4 gap-2 w-full h-96">
              {inputValue.map((i, index) => (
                <div key={index}>
                  <Button
                    label={i.value}
                    keyClass={i.value === "EQUALS" || i.value === "HISTORY"}
                    onButtonClick={handleButton}
                  />
                </div>
              ))}
            </div>
          </div>
          {history && (
            <div className="absolute bg-white h-full w-72 md:w-full space-y-2 p-4">
              <button
                onClick={() => setShowHistory(!history)}
                className="font-medium text-sm cursor-pointer hover:text-slate-600"
              >
                Back
              </button>

              <div>
                {t.map((i, index) => (
                  <div key={index}>
                    <div className="text-2xl">
                      {i.value} {i.value && `= ${i.ans}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
