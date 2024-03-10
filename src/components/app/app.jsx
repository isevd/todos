import { Component } from 'react';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  maxId = 10;

  state = {
    todoData: [],
    filter: 'all',
    status: 'pending',
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

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      createdDate: new Date(),
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    if (text.trim().length === 0) {
      alert('You can`t do nothing!');
    } else {
      this.setState(({ todoData }) => {
        const newArr = [newItem, ...todoData];
        return {
          todoData: newArr,
        };
      });
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = todoData.toSpliced(idx, 1);
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

  render() {
    const { todoData, filter } = this.state;
    const filteredTasks = this.filterTasks(todoData, filter);
    const totalCount = filteredTasks.filter((e) => !e.done).length;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList todos={filteredTasks} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
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
