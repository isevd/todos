import { useState, useEffect } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

let maxId = 10;
const date = new Date();
const initialState = [
  {
    label: 'Drink Coffee',
    done: false,
    isActive: false,
    id: 1,
    createdDate: date,
    timerValue: '01:20',
  },
  {
    label: 'Drink Tea',
    done: false,
    isActive: false,
    id: 2,
    createdDate: date,
    timerValue: '05:30',
  },
  {
    label: 'Drink Water',
    done: false,
    isActive: false,
    id: 3,
    createdDate: date,
    timerValue: '00:40',
  },
];

const App = () => {
  const [todoData, setTodoData] = useState(initialState);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const intervalIds = todoData
      .filter((item) => item.isActive)
      .map((item) => {
        return setInterval(() => {
          setTodoData((todoData) => {
            return todoData.map((todoItem) => {
              if (todoItem.id === item.id) {
                return { ...todoItem, timerValue: updateTimerValue(todoItem.timerValue) };
              }
              return todoItem;
            });
          });
        }, 1000);
      });

    return () => intervalIds.forEach(clearInterval);
  }, [todoData]);

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
      isActive: false,
      id: maxId++,
      createdDate: date,
      timerValue: setTimer(min, sec),
    };
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec);
    setTodoData((prevTodoData) => [newItem, ...prevTodoData]);
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => item.id !== id));
  };

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => prevTodoData.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => !item.done));
  };

  const startTimer = (id) => {
    setTodoData((prevTodoData) => prevTodoData.map((item) => (item.id === id ? { ...item, isActive: true } : item)));
  };

  const stopTimer = (id) => {
    setTodoData((prevTodoData) => prevTodoData.map((item) => (item.id === id ? { ...item, isActive: false } : item)));
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
