import { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onMinChange = (e) => {
      if (/^\d{0,2}$/.test(e.target.value)) {
        this.setState({
          minutes: e.target.value,
        });
      }
    };

    this.onSecChange = (e) => {
      if (/^\d{0,2}$/.test(e.target.value)) {
        this.setState({
          seconds: e.target.value,
        });
      }
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      const { onItemAdded } = this.props;
      const { label, minutes, seconds } = this.state;

      if (!minutes && !seconds) {
        return;
      }
      if (label.length === 0 || label.trim().length === 0) {
        return;
      }

      onItemAdded(label, minutes, seconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    };
  }

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <header className="header">
        <h1>Todo List</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input className="new-todo" placeholder="Task" type="text" value={label} onChange={this.onLabelChange} />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            value={minutes}
            onChange={this.onMinChange}
            min="0"
            max="99"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            value={seconds}
            onChange={this.onSecChange}
            min="0"
            max="59"
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}
