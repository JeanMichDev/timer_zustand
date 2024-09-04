export const Btn = ({ onClick, children, className }) => {
  return (
    <button
      className={` bg-red-300 hover:bg-red-400 text-black font-bold py-2 px-2 rounded ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
