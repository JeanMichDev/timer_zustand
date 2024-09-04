import { create } from "zustand";
import { useEffect } from "react";
import { handleFireworks } from "./functions/handleFireworks";
import { playSound } from "./functions/playSound";

export const useTimerStore = create((set) => ({
  timers: [],
  addTimer: (duration) => {
    set((curr) => ({
      timers: [
        ...curr.timers,
        {
          id: Date.now(),
          duration,
          timeLeft: duration,
          endAt: Date.now() + duration,
          isActive: true,
          progress: 0,
          onePointProgress: 100000 / duration, // progress va de 0 à 100 en duration secondes
          isVisible: true,
        },
      ],
    }));
  },
  removeTimer: (id) => {
    set((curr) => ({
      timers: curr.timers.filter((timer) => timer.id !== id),
    }));
  },
  toggleVisible: (id) => {
    set((curr) => ({
      timers: curr.timers.map((timer) => {
        if (timer.id !== id) return timer;
        return { ...timer, isVisible: !timer.isVisible };
      }),
    }));
  },

  toggleActive: (id) => {
    set((curr) => ({
      timers: curr.timers.map((timer) => {
        if (timer.id !== id) return timer;

        //on redemarre le timer
        if (timer.timeLeft === 0 && !timer.isActive)
          return {
            ...timer,
            isActive: true,
            timeLeft: timer.duration,
            endAt: Date.now() + timer.duration,
          };

        return {
          ...timer,
          isActive: !timer.isActive,
          endAt: Date.now() + timer.timeLeft,
        };
      }),
    }));
  },
  resetTimer: (id) => {
    set((curr) => ({
      timers: curr.timers.map((timer) => {
        if (timer.id !== id) return timer;
        return {
          ...timer,
          timeLeft: timer.duration,
          endAt: Date.now() + timer.duration,
          progress: 0,
          isActive: true,
        };
      }),
    }));
  },
}));

export const useTimerInterval = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval call");

      useTimerStore.setState((state) => ({
        timers: state.timers.map((timer) => {
          if (!timer.isActive) {
            return timer;
          }

          const onTimerFinish = () => {
            playSound("./sounds/ring.mp3");
            handleFireworks();
            return {
              ...timer,
              timeLeft: 0,
              isActive: false,
              progress: 100,
            };
          };

          const timeLeft = Math.round(timer.endAt - Date.now()); //Math.round car des fois JS peut avoir des petites imprécisions (pb de virgule flottante)
          console.log("timeleft", timeLeft);
          const progress = timer.progress + timer.onePointProgress;
          if (timeLeft <= 1000) {
            return onTimerFinish();
          }

          return {
            ...timer,
            timeLeft,
            progress,
          };
        }),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
