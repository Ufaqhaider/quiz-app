import React, { useEffect, useState } from 'react';
import he from 'he';
import Data from './data';
import useSound from 'use-sound';
import correct from './sounds/correct.mp3';
import play from './sounds/play.mp3';
import wrong from './sounds/wrong.mp3';
import axios from 'axios';

const Trivia = ({ settimeout, quesnum, setquesnum }) => {
  const [question, setQuestion] = useState(null);
  const [className,SetclassName]= useState('answer');
  const [selectedans,Setselectans]= useState(null);
  const [letsPlay]= useSound(play);
  const [correctAns]= useSound(correct);
  const [wrongAns]= useSound(wrong);
  const [quote,Setquote]=useState('');
  const [Id,setId]=useState(0)


  useEffect(() => {
    letsPlay();
  }, [letsPlay]);


  useEffect(() => {
    setQuestion(Data[quesnum - 1]);
  }, [quesnum]);

  const quoteAPI= async ()=>{
    let array = [];
    try{
        const data = await axios.get('https://opentdb.com/api.php?amount=48&category=18&difficulty=medium&type=multiple')
        array=data.data.results
        console.log(array)
    }catch(error){
      console.log(error)
    }

  try{
    Setquote(array)
  }catch(error){
    console.log(error)
  }

  }

  // 'https://api.quotable.io/random'
  useEffect(()=>{
    quoteAPI();
  },[])









  const handleClick=(ans)=>{
    return(
        Setselectans(ans),
        SetclassName('answer active'),
        setTimeout(()=>{ 
          SetclassName(ans === quote[Id].correct_answer ? 'answer correct' : 'answer wrong');
        },1000),

        setTimeout(()=>{
          if (ans === quote[Id].correct_answer) {
            correctAns() 
          } else {
              wrongAns()
          } 
        },3000),

        setTimeout(() => {
          if (ans === quote[Id].correct_answer) {
            setquesnum(quesnum + 1);
          } else {
            if (quesnum > 1) {
              setquesnum(quesnum - 1);
            }
          } 
          quoteId();
        }, 4000)
        
        
        
    )
  }

  function quoteId(){
    setId( Id+1)
  }


  const questionText = quote && quote[Id] ? quote[Id].question : '';
  const Incorrect_ans = quote && quote[Id] ? quote[Id].incorrect_answers:'';
  const Correct_ans = quote && quote[Id] ? quote[Id].correct_answer:'';

  const decodedQuestion = he.decode(questionText);
  const decodedCorr=he.decode(Correct_ans)

  // i did this because html not able to get the entity codes like apostophe and like these so that is why it shows problem in showing thse types of special character

  return (
    <div className='trivia'>
      <div className='question'>{decodedQuestion}</div>
      <div className='answers'>
  {console.log(quote[Id])}
  {Incorrect_ans && Incorrect_ans.map((ans, index) => (
  <div key={index} className={selectedans === ans ? className : 'answer'} onClick={() => handleClick(ans)}>
    {he.decode(ans)}
  </div>
))}
<div className={selectedans === Correct_ans ? className : 'answer'} onClick={() => handleClick(quote[Id]?.correct_answer)}>
  {decodedCorr}
</div>

</div>

    </div>
  );
};

export default Trivia;
