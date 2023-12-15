import { Component } from 'react';
import './tasks-filter.css';

export default class TaskFilter extends Component {
  render() {
    const { filter, setFilter } = this.props;
    return (
      <div className="footer">
        <ul className="filters">
          <li>
            <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>
              All
            </button>
          </li>
          <li>
            <button type="button" className={filter === 'active' ? 'selected' : ''} onClick={() => setFilter('active')}>
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
