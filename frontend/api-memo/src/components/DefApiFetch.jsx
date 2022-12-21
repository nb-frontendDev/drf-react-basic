import React, { useState, useEffect } from "react";
import axios from "axios";

const DefApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectTask, setSelectTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token d2a78a39bc6bc18151fa38074a0aeb92c1e81fbb",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token d2a78a39bc6bc18151fa38074a0aeb92c1e81fbb",
        },
      })
      .then((res) => {
        setSelectTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token d2a78a39bc6bc18151fa38074a0aeb92c1e81fbb",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectTask([]);
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post("http://127.0.0.1:8000/api/tasks/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token d2a78a39bc6bc18151fa38074a0aeb92c1e81fbb",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
      });
  };

  const editTask = (task) => {
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token d2a78a39bc6bc18151fa38074a0aeb92c1e81fbb",
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
      });
    setEditedTask({ id: "", title: "" });
  };

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen"></i>
            </button>
          </li>
        ))}
      </ul>
      Set Id <br />
      <input
        type="text"
        value={id}
        onChange={(event) => setId(event.target.value)}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Get Task
      </button>
      <h3>
        {selectTask.title}
        {selectTask.id}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New Task"
        required
      />
      {editedTask.id ? (
        <button type="button" onClick={() => editTask(editedTask)}>
          Edit
        </button>
      ) : (
        <button type="button" onClick={() => newTask(editedTask)}>
          Create
        </button>
      )}
    </div>
  );
};

export default DefApiFetch;
