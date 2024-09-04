import { Btn } from "./AddBtn";
import { Trash2, Play, Pause, RotateCcw } from "lucide-react";
import { ClockRunner } from "./ClockRunner";
import { motion, AnimatePresence } from "framer-motion";
import { useTimerStore } from "./store";
import { TotalDuration } from "./TotalDuration";

export const CreateTimer = ({ id, className }) => {
  const timer = useTimerStore(
    (store) => store.timers.find((timer) => timer.id === id) // on récupère le timer correspondant à l'id et ses propriétés
  );
  const toggleVisible = useTimerStore((store) => store.toggleVisible);
  const removeTimer = useTimerStore((store) => store.removeTimer);
  const toggleActive = useTimerStore((store) => store.toggleActive);
  const resetTimer = useTimerStore((store) => store.resetTimer);

  const endAt = new Date(timer.endAt); // new Date() pour convertir le timestamp en objet Date

  return (
    <AnimatePresence>
      {timer.isVisible && (
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div
            className={`relative mt-2 p-2 border-2 border-gray-700 rounded-lg ${className}`}
          >
            <Btn
              onClick={() => {
                toggleVisible(id);
                setTimeout(() => {
                  removeTimer(id);
                }, 800);
              }}
              className="absolute top-1 left-1"
            >
              <Trash2 size={12} />
            </Btn>

            <ClockRunner
              timeLeft={timer.timeLeft}
              progress={timer.progress}
              isActive={timer.isActive}
            >
              <p>Finish at : {endAt.toLocaleTimeString()}</p>
              <TotalDuration duration={timer.duration} />
            </ClockRunner>

            <Btn
              onClick={() => {
                toggleActive(id);
              }}
              className="absolute bottom-1 left-1"
            >
              {timer.isActive ? <Pause size={12} /> : <Play size={12} />}
            </Btn>

            <Btn
              onClick={() => {
                resetTimer(id);
              }}
              className="absolute bottom-1 right-1"
            >
              <RotateCcw size={12} />
            </Btn>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
