import { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    if (/^\d{0,2}$/.test(e.target.value)) {
      setMinutes(e.target.value);
    }
  };

  const onSecChange = (e) => {
    if (/^\d{0,2}$/.test(e.target.value)) {
      setSeconds(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!minutes && !seconds) {
      return;
    }
    if (label.length === 0 || label.trim().length === 0) {
      return;
    }

    onItemAdded(label, minutes, seconds);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <header className="header">
      <h1>Todo List</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="Task" type="text" value={label} onChange={onLabelChange} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          value={minutes}
          onChange={onMinChange}
          min="0"
          max="59"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          value={seconds}
          onChange={onSecChange}
          min="0"
          max="59"
        />
        <button type="submit"></button>
      </form>
    </header>
  );
};

export default NewTaskForm;
