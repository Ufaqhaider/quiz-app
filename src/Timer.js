import React, { useEffect, useState } from "react";



const Timer = ({quesnum, setTimeOut}) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time,setTimeOut]);

  useEffect(() => {
    setTime(30);
  }, [quesnum]);
  return <div>{time}</div>;
};

export default Timer;
