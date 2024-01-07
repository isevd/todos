import './footer.css';

import TasksFilter from '../tasks-filter/tasks-filter';

const Footer = ({ totalCount, onChangeFilter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{totalCount} items left</span>
      <TasksFilter onChangeFilter={onChangeFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
