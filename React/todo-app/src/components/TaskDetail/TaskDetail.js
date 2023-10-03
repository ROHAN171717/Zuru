import React, { useState } from "react";
import "./TaskDetail.css";

const TaskDetail = ({ taskDetail, deleteTask, editTask }) => {

  const [isEditTask, setIsEditTask] = useState(false);
  const [task, setTask] = useState(taskDetail.task);
  // console.log(t);
  
  // const [checkedTask, setCheckedTask] = useState(taskDetail.checked);

  return (
    <>
      <div className="d1">
        <input type="checkbox" className="checkbox" checked={taskDetail.checked} onChange={(e) => {
          // setCheckedTask(e.target.checked); 
          editTask({ ...taskDetail, checked: e.target.checked})
        }}/>
      </div>
      <div className="d2">
        {isEditTask ? (
          <input
            className="edit-task"
            type="text"
            autoFocus
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
            }}
          />
        ) : (
          <p className={`task ${taskDetail.checked ? "checked" : ""}`}>{task}</p>
        )}
      </div>
      {isEditTask ? (
        <button
        className="btn save-btn"
        onClick={() => {
          setIsEditTask(false);
          editTask({ ...taskDetail, task: task });
        }}
      >
        Save
      </button>
      ): (
        <button
        className="btn edit-btn"
        onClick={() => {
          setIsEditTask(true);
        }}
      >
        Edit
      </button>
      )}
      <button className="btn delete-btn" onClick={() => deleteTask(taskDetail.id)}>
        Delete
      </button>
    </>
  );
};

export default TaskDetail;
