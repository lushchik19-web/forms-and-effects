import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Mount");

    const intervalId = setInterval(() => {
      console.log(intervalId);
      setTime(new Date());
    }, 1000);

    return () => {
      console.log("Unmount");
      clearInterval(intervalId); // Виключаємо меморі ліки
    };
    // Монтування, розмонтування, монтування відбуваються за рахунок StrictMode і тільки на етапі розробки.
  }, []); // Тільки цей інтервал проініціалізуїться і тільки він буде виконуватися

  //   const intervalId = setInterval(() => {
  //     console.log(intervalId);
  //     setTime(new Date());
  //   }, 1000); // інтервали множаться в геометричній прогресії

  return (
    <>
      <h2>Your time is exact!</h2>
      <p>{time.toLocaleString()}</p>
      {/* <p>{time.toLocaleDateString()}</p>
      <p>{time.toLocaleTimeString()}</p> */}
    </>
  );
}

export default Timer;
