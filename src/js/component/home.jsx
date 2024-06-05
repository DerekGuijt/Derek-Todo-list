import React, { useState, useEffect } from "react";

const Home = () => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/todos") 
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching todos:", error));
    }, []);

    const handleClick = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);
            setNewTodo("");

            fetch("https://api.example.com/todos", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ todo: newTodo }),
            })
            .then(response => response.json())
            .then(data => console.log("Todo added:", data))
            .catch(error => console.error("Error adding todo:", error));
        }
    };

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTask = (index) => {
        const updatedTodos = todos.filter((todo, i) => i !== index);
        setTodos(updatedTodos);

        fetch(`https://api.example.com/todos/${index}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => console.log("Todo deleted:", data))
        .catch(error => console.error("Error deleting todo:", error));
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
                <button className="btn btn-lg btn-primary col-2" onClick={handleClick}>Add to the list</button>
            </div>
            <h3>New task: {newTodo}</h3>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        {todo}
                        <button className="m-3 btn btn-danger" onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
