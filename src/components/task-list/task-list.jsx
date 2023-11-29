import Task from '../task/task';

function TaskList({ todos, onDeleted, onToggleDone }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return <Task {...itemProps} key={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} />;
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
