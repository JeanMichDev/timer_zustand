import { Btn } from "./AddBtn";
import { CurrentTime } from "./CurrentTime";
import { TimerInputElement } from "./TimerInputElement";
import React, { useState } from "react";
import { SeparationTimer } from "./SeparationTimer";
import { useTimerStore } from "./store";

export const TimerInput = ({ className }) => {
  const [inputTime, setInputTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });
  const addTimer = useTimerStore((store) => store.addTimer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, inputTime);
    setInputTime({
      ...inputTime,
      [name]: Number(value),
    });
    console.log(inputTime);
  };

  const handleClick = () => {
    if (!inputTime.hours && !inputTime.minutes && !inputTime.seconds) {
      alert("Please enter at least 1 sec");
      return;
    }

    const duration =
      inputTime.hours * 3600000 +
      inputTime.minutes * 60000 +
      inputTime.seconds * 1000;
    addTimer(duration);
    setInputTime({
      ...inputTime,
      hours: null,
      minutes: null,
      seconds: null,
    });
  };

  return (
    <main className={`mx-auto min-h-full  ${className}  `}>
      <h1 className="text-4xl text-center mt-5">What year are we?</h1>
      <CurrentTime />
      <div className="flex flex-row items-center justify-center">
        <TimerInputElement
          name="hours"
          unit="hours"
          timeData="00"
          value={inputTime.hours ? inputTime.hours : "00"}
          onChange={handleInputChange}
          className="border-l-2 border-l-white text-white"
        ></TimerInputElement>
        <SeparationTimer>:</SeparationTimer>
        <TimerInputElement
          name="minutes"
          unit="min"
          timeData="00"
          value={inputTime.minutes ? inputTime.minutes : "00"}
          onChange={handleInputChange}
        ></TimerInputElement>
        <SeparationTimer>:</SeparationTimer>
        <TimerInputElement
          name="seconds"
          unit="sec"
          timeData="00"
          value={inputTime.seconds ? inputTime.seconds : "00"}
          onChange={handleInputChange}
          className="border-r-2 border-r-white "
        ></TimerInputElement>
      </div>
      <div className="text-center">
        <Btn className="mt-4 text-gray-700" onClick={handleClick}>
          Add Timer
        </Btn>
      </div>
    </main>
  );
};
