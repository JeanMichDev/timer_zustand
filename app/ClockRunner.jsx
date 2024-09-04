import { getTimeText } from "./functions/getTimeText";

export const ClockRunner = ({ timeLeft, progress, children }) => {
  return (
    //utilisation de https://daisyui.com/components/radial-progress/ pour générer le cercle de progression
    <div
      className="radial-progress bg-gray-700 h-100 w-100 justify-center items-center flex flex-col"
      style={{ "--value": progress, "--size": "12rem", "--thickness": "2px" }}
      role="progressbar"
    >
      {getTimeText(timeLeft)}
      {children}
    </div>
  );
};
