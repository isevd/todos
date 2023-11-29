import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    updateInterval: 1000,
  };

  static propTypes = {
    updateInterval: PropTypes.number,
  };

  state = {
    time: new Date(),
    editing: false,
    label: this.props.label,
  };

  intervalId = null;

  updateFormattedDistance = () => {
    const formattedDistance = formatDistanceToNow(new Date(), {
      includeSeconds: true,
    });
    this.setState({ formattedDistance });
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.intervalId = setInterval(this.updateFormattedDistance, updateInterval);
  }

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    let status = 'status';
    if (done) status = 'completed';

    return (
      <li className={status}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              {' '}
              Created{' '}
              {formatDistanceToNow(this.state.time, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
