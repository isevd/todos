import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer/timer';

const Task = ({
  createdDate,
  label,
  onDeleted,
  onToggleDone,
  done,
  id,
  startTimer,
  stopTimer,
  todoList,
  timerValue,
}) => {
  const initialTime = () => {
    return formatDistanceToNow(createdDate, {
      includeSeconds: true,
      addSuffix: true,
    });
  };

  const [formattedDistance, setFormattedDistance] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDistance(initialTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let status = 'status';
  if (done) status = 'completed';

  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} id={id} />
        <label>
          <span className="title">{label}</span>
          <div className="description">
            <Timer id={id} taskList={todoList} startTimer={startTimer} stopTimer={stopTimer} timerValue={timerValue} />
          </div>
          <span className="description">created {formattedDistance}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  );
};

export default Task;
