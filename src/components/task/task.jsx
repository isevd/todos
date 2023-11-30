import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    updateInterval: 1000,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
  };

  state = {
    formattedDistance: '',
    editing: false,
    label: this.props.label,
  };

  updateFormattedDistance = () => {
    const { createdDate } = this.props;
    const formattedDistance = formatDistanceToNow(createdDate, {
      includeSeconds: true,
      addSuffix: true,
    });
    this.setState({ formattedDistance });
  };

  intervalId = null;

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updateFormattedDistance();
    this.intervalId = setInterval(this.updateFormattedDistance, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;
    const { formattedDistance } = this.state;
    let status = 'status';
    if (done) status = 'completed';

    return (
      <li className={status}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{formattedDistance}</span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input type="text" className="edit" value="Editing task"></input>
      </li>
    );
  }
}
