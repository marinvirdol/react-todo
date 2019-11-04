import React from 'react';
import PropTypes from 'prop-types'
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {
  addTodo, generateId, findById, toggleTodo, updateTodo,
  removeTodo, filterTodos
} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'

class App extends React.Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({todos}))
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();

    const updatedTodos = removeTodo(this.state.todos, id);

    this.setState({todos: updatedTodos});

    destroyTodo(id).then(() => this.showTempMessage('Todo Removed'))
  }

  handleToggle = id => {
    const getToggledTodo = pipe(
      findById,
      toggleTodo,
    );

    const updated = getToggledTodo(id, this.state.todos);

    const getUpdatedTodos = partial(updateTodo, this.state.todos)

    const updatedTodos = getUpdatedTodos(updated)

    this.setState({todos: updatedTodos});

    saveTodo(updated).then(() => this.showTempMessage('Todo Updated'))
  }

  handleInputChange = evt => {
    this.setState({currentTodo: evt.target.value});
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);

    createTodo(newTodo).then(() => {
      this.setState({
        todos: updatedTodos,
        currentTodo: '',
        errorMessage: '',
      });
      this.showTempMessage('Todo added')
    })
  }

  handleEmptySubmit = evt => {
    evt.preventDefault();

    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  showTempMessage = msg => {
    this.setState({message: msg});
    setTimeout(() => this.setState({message: ''}), 2000)
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <header className="App-header">
          <h2>React Todos</h2>
        </header>

        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            currentTodo={this.state.currentTodo}
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
          />
          <TodoList
            todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}/>

          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
