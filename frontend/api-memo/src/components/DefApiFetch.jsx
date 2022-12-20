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

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            {task.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DefApiFetch;
