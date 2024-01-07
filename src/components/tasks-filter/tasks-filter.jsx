import './tasks-filter.css';

const TaskFilter = ({ filter, onChangeFilter }) => {
  return (
    <div className="footer">
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => onChangeFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => onChangeFilter('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => onChangeFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TaskFilter;
