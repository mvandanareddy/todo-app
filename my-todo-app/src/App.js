import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // import CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!text) return;
    try {
      await axios.post("http://localhost:5000/todos", { text });
      setText("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🌟 Todo App</h1>

      <div className="todo-card">
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span
                onClick={() => toggleTodo(todo._id)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
