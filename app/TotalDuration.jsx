export const TotalDuration = ({ duration }) => {

  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);



  return (
    <div className="italic">
      <p> {hours > 0 ? `${hours} hours  ${minutes} mins ` : null}</p>
      <p>
        {" "}
        {hours === 0 && minutes > 0 ? `${minutes} mins  ${seconds} sec` : null}
      </p>
      <p> {hours === 0 && minutes === 0 ? `${seconds} sec ` : null}</p>
    </div>
  );
};
