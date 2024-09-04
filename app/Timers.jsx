import { CreateTimer } from "./CreateTimer";
import { useTimerStore } from "./store";

export const Timers = () => {
  const timers = useTimerStore((store) =>
    store.timers.map((timer) => timer.id)
  );
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {timers.map((timer) => (
        <CreateTimer key={timer.id} id={timer} />
      ))}
    </div>
  );
};
