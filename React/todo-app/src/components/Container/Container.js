import React, { useState } from "react";
import AddTask from "../AddTask/AddTask";
import ShowTasks from "../ShowTasks/ShowTasks";
import "./Container.css";

const Container = () => {
  const initialState = localStorage.getItem("Tasks")
    ? JSON.parse(localStorage.getItem("Tasks"))
    : [];
  const [savedTasks, setSavedTasks] = useState(initialState);

  function saveData(tasks) {
    setSavedTasks(tasks);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }

  function addTask(newTask) {
    const newTaskObject = {
      id: Date.now(),
      task: newTask,
      checked: false,
    };
    saveData([...savedTasks, newTaskObject]);
  }

  function deleteTask(taskId) {
    const newArr = savedTasks.filter((task) => task.id !== taskId);
    saveData(newArr);
  }

  function editTask(editedTask) {
    const newArr = [];
    
    savedTasks.forEach((task) => {
      if (task.id === editedTask.id) { 
        newArr.push(editedTask)
      } else {
        newArr.push(task);
      }
    });
    saveData(newArr);
  }

  return (
    <div className="container">
      <h1 className="heading">To - Do List</h1>
      <AddTask addTask={addTask} />
      <ShowTasks
        tasks={savedTasks}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

export default Container;
