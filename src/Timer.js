import React, { useEffect, useState } from "react";



const Timer = ({quesnum, settimeOut}) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) return settimeOut(true);
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time,settimeOut]);

  useEffect(() => {
    setTime(30);
  }, [quesnum]);
  return <div>{time}</div>;
};

export default Timer;
