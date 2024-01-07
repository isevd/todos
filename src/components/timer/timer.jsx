const Timer = ({ id, timerValue, startTimer, stopTimer }) => {
  return (
    <>
      <button
        className="icon icon-play"
        onClick={() => {
          startTimer(id);
        }}
      ></button>
      <button
        className="icon icon-pause"
        onClick={() => {
          stopTimer(id);
        }}
      ></button>
      <span className="time">{timerValue}</span>
    </>
  );
};

export default Timer;
