import React, { useState } from "react";
import "./TaskDetail.css";

const TaskDetail = ({ taskDetail, deleteTask, editTask }) => {
  const [isEditTask, setIsEditTask] = useState(false);
  const [task, setTask] = useState(taskDetail.task);

  return (
    <>
      <div className="left_wrapper">
        <input
          type="checkbox"
          className="checkbox"
          checked={taskDetail.checked}
          onChange={(e) => {
            editTask({ ...taskDetail, checked: e.target.checked });
          }}
        />
      </div>
      <div className="right_wrapper">
        {isEditTask ? (
          <input
            className="edit-task"
            type="text"
            autoFocus
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        ) : (
          <p className={`task ${taskDetail.checked ? "checked" : ""}`}>
            {task}
          </p>
        )}
        <div className="btn_div">
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
        ) : (
          <button
            className="btn edit-btn"
            onClick={() => {
              setIsEditTask(true);
            }}
          >
            Edit
          </button>
        )}
        <button
          className="btn delete-btn"
          onClick={() => deleteTask(taskDetail.id)}
        >
          Delete
        </button>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
