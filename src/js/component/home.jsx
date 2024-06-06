import React, { useState, useEffect } from "react";

// Include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState("daperk");
  const [isLoading, setIsLoading] = useState(false);

  // API URL
  const API_BASE_URL = `https://playground.4geeks.com/todo`;

  useEffect(() => {
    initializeUser();
  }, []);

  const handleApiError = async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
  };

  const initializeUser = async () => {
    const response = await fetch(`${API_BASE_URL}/users/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTodos(data.todos);
    } else {
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setIsLoading(false);
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user,
          todos: [],
        }),
      });
      await handleApiError(response);
      await fetchTodos();
    } catch (error) {
      console.error("Error creating user:", error);
      setIsLoading(false);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
        },
      });
      await handleApiError(response);
      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
    setIsLoading(false);
  };

  const handleClick = async () => {
    // if (newTodo.trim() !== "") {
    //   setTodos([...todos, newTodo]);
    //   setNewTodo("");
    // }
    const url = "https://playground.4geeks.com/todo/todos/daperk";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newTodo,
        is_done: false,
      }),
    });
    const data = await response.json();
    setTodos([data, ...todos]);
    setNewTodo("");
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTask = async (id) => {
    const url = `https://playground.4geeks.com/todo/todos/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    console.log(id);
    const newList = todos.filter((todo) => todo.id !== id);
    setTodos(newList);
  };
  return (
    <div className="container text-center">
      <div>
        <h1 className="text-center mt-5">ToDo List May 28, 2024</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <input
          className="form-control-lg col-10"
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="New Task"
        />
        <button className="btn btn-lg btn-primary col-2" onClick={handleClick}>
          Add to the list
        </button>
      </div>
      <h3>New task: {newTodo}</h3>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {todo.label}
            <button
              className="m-3 btn btn-danger"
              onClick={() => deleteTask(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
