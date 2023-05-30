import React,{useMemo,useState,useEffect} from 'react';
import Trivia from './Trivia';
import Timer from './Timer';


function App() {
  const [quesnum,setquesnum]=useState(1);
  const [timeOut, settimeOut] = useState(false);
  const [earned,Setearned]=useState('$ 0')

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    quesnum > 1 &&
      Setearned(moneyPyramid.find((m) => m.id === quesnum - 1).amount);
  }, [quesnum, moneyPyramid]);

  return (
    <div className="app">
      <div className="main">
      {timeOut ? (<h1 className="endText">You earned: {earned}</h1>) : (
      <>
        <div className='top'>
          <div className='timer'><Timer settimeOut={settimeOut} quesnum={quesnum}/></div>
        </div>
        <div className='bottom'>
        <Trivia settimeOut={settimeOut} quesnum={quesnum} setquesnum={setquesnum}/>
        </div>
        </>
        ) }
        </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((each)=>{
            return(
              <li className={quesnum===each.id ? "moneyListItem active" : "moneyListItem"}>
                <span className="moneyListItemNumber">{each.id}</span>
                <span className="moneyListItemAmount">{each.amount}</span>
              </li>
            )
          })}
   
        </ul>
      </div>
    </div>
  );
}

export default App;
