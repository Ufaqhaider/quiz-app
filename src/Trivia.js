import React, { useEffect, useState } from 'react';
import Data from './data';
import useSound from 'use-sound';
import correct from './sounds/correct.mp3';
import play from './sounds/play.mp3';
import wait from './sounds/wait.mp3';
import wrong from './sounds/wrong.mp3';

const Trivia = ({ settimeout, quesnum, setquesnum }) => {
  const [question, setQuestion] = useState(null);
  const [className,SetclassName]= useState('answer');
  const [selectedans,Setselectans]= useState(null);
  const [letsPlay]= useSound(play);
  const [correctAns]= useSound(correct);
  const [wrongAns]= useSound(wrong);
  const [waiting]= useSound(wait);


  useEffect(() => {
    letsPlay();
  }, [letsPlay]);


  useEffect(() => {
    setQuestion(Data[quesnum - 1]);
  }, [quesnum]);


  const handleClick=(ans)=>{
    return(
        Setselectans(ans),
        SetclassName('answer active'),
        setTimeout(()=>{ 
            SetclassName(ans.correct? 'answer correct' : 'answer wrong');
        },1000),
        setTimeout(()=>{
          setquesnum(ans.correct? quesnum+1:quesnum)
      },4000)
        
        
    )
  }

  return (
    <div className='trivia'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((ans, index) => (
          <div key={index} className={selectedans === ans ? className : 'answer'} onClick={()=>handleClick(ans)}>
            {ans.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
