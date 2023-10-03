import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState('');

  return (
    <div className="row">
      <input
        id="input-box"
        type="text"
        placeholder="Add Your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="button" type="submit" onClick={() => {
        addTask(task);
        setTask('');
      }
      }>
        Add
      </button>
    </div>
  );
};

export default AddTask;
