import { useState } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

let maxId = 10;
const date = new Date();

const App = () => {
  const [todoData, setTodoData] = useState([
    {
      label: 'Drink Coffee',
      done: false,
      timerId: null,
      id: 1,
      createdDate: date,
      timerValue: '01:20',
    },
    {
      label: 'Drink Tea',
      done: false,
      timerId: null,
      id: 2,
      createdDate: date,
      timerValue: '05:30',
    },
    {
      label: 'Drink Water',
      done: false,
      timerId: null,
      id: 3,
      createdDate: date,
      timerValue: '00:40',
    },
  ]);
  const [filter, setFilter] = useState('all');

  const onChangeFilter = (filter) => {
    setFilter(filter);
  };

  const filterTasks = (todoData, filter) => {
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
  };

  const createTodoItem = (label, min, sec) => {
    const date = new Date();

    return {
      label: label,
      done: false,
      timerId: null,
      id: maxId++,
      createdDate: date,
      timerValue: setTimer(min, sec),
    };
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData([newItem, ...todoData]);
  };

  const deleteItem = (id) => {
    setTodoData(todoData.filter((item) => item.id !== id));
  };

  const onToggleDone = (id) => {
    setTodoData(todoData.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.done));
  };

  const startTimer = (id) => {
    setTodoData((todoData) => {
      const taskIndex = todoData.findIndex((item) => item.id === id);
      const task = todoData[taskIndex];

      if (task.timerId === null && !task.done) {
        const newArr = [...todoData];
        newArr[taskIndex].timerId = createTimerInterval(id);

        return newArr;
      }
      return todoData;
    });
  };

  const stopTimer = (id) => {
    setTodoData(todoData.map((item) => (item.id === id ? { ...item, timerId: clearInterval(item.timerId) } : item)));
  };

  const createTimerInterval = (id) => {
    return setInterval(() => {
      setTodoData((todoData) => {
        const newArr = todoData.map((item) =>
          item.id === id ? { ...item, timerValue: updateTimerValue(item.timerValue) } : item
        );
        return newArr;
      });
    }, 1000);
  };

  const updateTimerValue = (timerValue) => {
    const time = timerValue.split(':');
    let minutes = parseInt(time[0], 10);
    let seconds = parseInt(time[1], 10);
    if (minutes > 0 || seconds > 0) {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
    }
    return setTimer(minutes, seconds);
  };

  const setTimer = (min = '00', sec = '00') => {
    let minutes = parseInt(min, 10) || 0;
    let seconds = parseInt(sec, 10) || 0;

    minutes = Math.min(60, Math.max(0, minutes));
    seconds = Math.min(60, Math.max(0, seconds));

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const filteredTasks = filterTasks(todoData, filter);
  const totalCount = filteredTasks.filter((e) => !e.done).length;

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} setTimer={setTimer} />
      <section className="main">
        <TaskList
          todoList={filteredTasks}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          totalCount={totalCount}
          filter={filter}
          onChangeFilter={onChangeFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

export default App;
