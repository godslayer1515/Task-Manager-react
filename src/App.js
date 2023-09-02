import React from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { useState, useEffect } from "react"
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaskDetails from './components/TaskDetails';
// import {BrowserRouter,Route} from 'react-router-dom'
// import { Router } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    return data
  }


  // ADD task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // // console.log(id)
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    // console.log("delete ",id)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(
      tasks.filter((task) => {
        return id !== task.id
      })
    )
  }
  // fetchTask
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        (task.id === id ? { ...task, reminder: !task.reminder } : task)
      )
    )
  }


  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAdd={() =>
          (setShowAddTask(!showAddTask))} showAdd={showAddTask} />
        <Routes>
          <Route path='/' element={
             <>
             {showAddTask && <AddTask onAdd={addTask} />}
             {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : 'No tasks to do'}
           </>
          } />
          <Route path='/About' element={<About/>} />
          <Route path='/task/:id' element={<TaskDetails/>} />
        </Routes>
        <Footer />
      </div>
    </Router>

  );
}


{/* // how to use a class
// class App extends React.Component {
//   render() {
//     return(
//       <h1>
//         Hello from a class
//       </h1>
//     )
//   }
// } */}
export default App;
