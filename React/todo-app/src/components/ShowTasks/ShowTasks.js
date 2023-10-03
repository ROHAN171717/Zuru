import React from "react";
import TaskDetail from "../TaskDetail/TaskDetail";
import "./ShowTasks.css";

const ShowTasks = ({ tasks, deleteTask, editTask }) => {

  return (
    <div className="todo">
      <ul>
        {tasks?.map((task) => {
          return (
            <li className="item" key={Math.random()} >
              <TaskDetail taskDetail={task} deleteTask={deleteTask} editTask={editTask}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowTasks;
