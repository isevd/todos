import { Component } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  maxId = 10;
  timerId = null;
  date = new Date();

  state = {
    todoData: [
      {
        label: 'Drink Coffee',
        done: false,
        timerId: null,
        id: 1,
        createdDate: this.date,
        timerValue: '01:20',
      },
      {
        label: 'Drink Tea',
        done: false,
        timerId: null,
        id: 2,
        createdDate: this.date,
        timerValue: '05:30',
      },
      {
        label: 'Drink Water',
        done: false,
        timerId: null,
        id: 3,
        createdDate: this.date,
        timerValue: '00:40',
      },
    ],
    filter: 'all',
  };

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  filterTasks(todoData, filter) {
    switch (filter) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((item) => !item.done);
      case 'completed':
        return todoData.filter((item) => item.done);
      default:
        return todoData;
    }
  }

  createTodoItem(label, min, sec) {
    const date = new Date();

    return {
      label: label,
      done: false,
      timerId: null,
      id: this.maxId++,
      createdDate: date,
      timerValue: this.setTimer(min, sec),
    };
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [newItem, ...todoData];
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.toSpliced(idx, 1);
      clearInterval(todoData[idx].timerId);
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      clearInterval(todoData[idx].timerId);
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.done);
      return {
        todoData: newArr,
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      const idx = newArr.findIndex((el) => el.id === id);
      if (newArr[idx].timerId !== null || newArr[idx].status === 'completed') {
        return {
          todoData: newArr,
        };
      }

      newArr[idx].timerId = setInterval(() => {
        const time = newArr[idx].timerValue.split(':');
        let minutes = parseInt(time[0], 10);
        let seconds = parseInt(time[1], 10);
        if (minutes > 0 || seconds > 0) {
          if (seconds === 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
        } else {
          clearInterval(newArr[idx].timerId);
          newArr[idx].timerId = null;
        }

        const newTime = this.setTimer(minutes, seconds);
        newArr[idx].timerValue = newTime;
        this.setState({ todoData: newArr });
      }, 1000);

      return {
        todoData: newArr,
      };
    });
  };

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      const idx = newArr.findIndex((el) => el.id === id);
      clearInterval(newArr[idx].timerId);
      newArr[idx].timerId = null;
      return {
        todoData: newArr,
      };
    });
  };

  setTimer = (min = '00', sec = '00') => {
    let minutes = parseInt(min, 10) || 0;
    let seconds = parseInt(sec, 10) || 0;

    minutes = Math.min(60, Math.max(0, minutes));
    seconds = Math.min(60, Math.max(0, seconds));

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  render() {
    const { todoData, filter } = this.state;
    const filteredTasks = this.filterTasks(todoData, filter);
    const totalCount = filteredTasks.filter((e) => !e.done).length;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} setTimer={this.setTimer} />
        <section className="main">
          <TaskList
            todoList={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            totalCount={totalCount}
            filter={filter}
            setFilter={this.setFilter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
