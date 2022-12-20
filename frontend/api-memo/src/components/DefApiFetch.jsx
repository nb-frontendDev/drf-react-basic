import React, { useState, useEffect } from "react";
import axios from "axios";

const DefApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectTask, setSelectTask] = useState([]);
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
      </div>
    );
};

export default DefApiFetch;
