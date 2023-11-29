import { PureComponent } from 'react';

import TasksFilter from '../tasks-filter/tasks-filter';

export default class Footer extends PureComponent {
  render() {
    const { totalCount, filter, setFilter } = this.props;
    const { clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{totalCount} items left</span>
        <TasksFilter filter={filter} setFilter={setFilter} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
