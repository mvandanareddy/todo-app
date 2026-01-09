import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://todo-app-production-8fde.up.railway.app"; // Railway backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos on first render
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      alert("Failed to fetch todos from backend");
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!text) return;
    try {
      await axios.post(`${API_URL}/todos`, { text });
      setText("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    }
  };

  // Toggle completed status
  const toggleTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
      alert("Failed to update todo");
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>MERN Todo App</h2>

      <div style={styles.inputContainer}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo._id} style={styles.todoItem}>
            <span
              onClick={() => toggleTodo(todo._id)}
              style={{
                ...styles.todoText,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#000"
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple inline styles
const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "2px solid #4a90e2",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4a90e2"
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px 0 0 8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  addButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "0 8px 8px 0",
    backgroundColor: "#4a90e2",
    color: "#fff",
    cursor: "pointer"
  },
  todoList: {
    listStyle: "none",
    padding: 0
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  todoText: {
    cursor: "pointer",
    fontSize: "16px"
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default App;
