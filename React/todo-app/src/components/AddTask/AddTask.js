import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState("");
  
  function handleClick(e) {
    if (task.trim() === "") {
      alert("You must write something!!!");
    } else {
      addTask(task.trim());
    }
    setTask("");
  }

  return (
    <div className="row">
      <input
        id="input-box"
        type="text"
        placeholder="Add Your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <button
        className="button"
        type="submit"
        onClick={() => {
          handleClick();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddTask;
