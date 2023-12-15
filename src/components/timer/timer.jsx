import { Component } from 'react';

export default class Timer extends Component {
  render() {
    const { id, timerValue, startTimer, stopTimer } = this.props;
    return (
      <>
        <button
          className="icon icon-play"
          onClick={() => {
            startTimer(id);
          }}
        ></button>
        <button
          className="icon icon-pause"
          onClick={() => {
            stopTimer(id);
          }}
        ></button>
        <span className="time">{timerValue}</span>
      </>
    );
  }
}
