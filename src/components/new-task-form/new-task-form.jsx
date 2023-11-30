import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    valid: true,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            type="text"
            value={this.state.label}
            onChange={this.onLabelChange}
          />
        </form>
      </header>
    );
  }
}
