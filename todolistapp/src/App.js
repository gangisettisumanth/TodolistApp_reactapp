
import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.css';

const TodoList = ({ todos, dispatch, setEditTodoText, showCompleted }) => {
  return (
    <ul>
      {todos.map((todo) => (
        
        (!showCompleted || todo.completed) && (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'red' : 'black',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            >
              {todo.title}
            </span>
            <button onClick={() => setEditTodoText(todo.id)} style={{ width: '90px', marginLeft: '10px' }}>
              Edit
            </button>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })} style={{ width: '90px', marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        )
      ))}
    </ul>
  );
};

const initialState = {
  todos: [],
  editedTodo: null,
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'FETCH_TODOS':
      return { todos: action.payload, editedTodo: null };
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload], editedTodo: null };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
        editedTodo: null,
      };
    case 'DELETE_TODO':
      return { todos: state.todos.filter((todo) => todo.id !== action.payload), editedTodo: null };
    case 'EDIT_TODO':
      return { todos: state.todos, editedTodo: action.payload };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
        ),
        editedTodo: null,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => dispatch({ type: 'FETCH_TODOS', payload: response.data }))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') {
      alert('Please enter the text before adding a task.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    dispatch({ type: 'ADD_TODO', payload: newTask });
    setNewTodo('');
  };

  const updateTodo = () => {
    if (newTodo.trim() === '') {
      alert('Please enter the text before updating the task.');
      return;
    }

    dispatch({ type: 'UPDATE_TODO', payload: { id: state.editedTodo, title: newTodo } });
    setNewTodo('');
  };

  const setEditTodoText = (todoId) => {
    const todoToEdit = state.todos.find((todo) => todo.id === todoId);
    if (todoToEdit) {
      setNewTodo(todoToEdit.title);
      dispatch({ type: 'EDIT_TODO', payload: todoId });
    }
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="App">
      <h1>TodoList App</h1>
      <div className="box">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '10px',
          }}
        />
        <button onClick={state.editedTodo !== null ? updateTodo : addTodo}>
          {state.editedTodo !== null ? 'Update Task' : 'Add Task'}
        </button>
        <button onClick={toggleShowCompleted}>{showCompleted ? 'Show All' : 'Show Completed'}</button>
      </div>

      <TodoList todos={state.todos} dispatch={dispatch} setEditTodoText={setEditTodoText} showCompleted={showCompleted} />
    </div>
  );
};

export default App;









