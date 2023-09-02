// import React from 'react'
import Task from "./Task"

const Tasks = ({ tasks,onDelete,onToggle }) => {
  return (
    <>
      {tasks.map((task)=>
      (
        <Task key={task.id} task = {task} onDelete = {onDelete} toggleReminder = {onToggle}/>
      ))}
    </>
  )
}

export default Tasks
