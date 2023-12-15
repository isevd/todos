import Task from '../task/task';
import './task-list.css';

const TaskList = ({ todoList, onDeleted, onToggleDone, startTimer, stopTimer }) => {
  const elements = todoList.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        {...itemProps}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        timerValue={itemProps.timerValue}
        startTimer={startTimer}
        taskList={todoList}
        stopTimer={stopTimer}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
