
import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import Header from "./components/Header"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask"
import TaskDetails from "./components/TaskDetails";
import "./App.css"

// app component pai que renderiza outro componente
const App = () => {
  //let message = "Hello World!"
   // Variavel state, atualiza o componente
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar programação',
      completed: true
    },
    {
      id: '2',
      title: 'Ler livros',
      completed: false
    },
   
  ]);

  useEffect(() => {
    const fetchTask = async () => {
      const {data} = await axios.get(
        'https://jsonplaceholder.cypress.io/todos?_limit=10'
        );
        setTasks(data)
    };
    fetchTask();
  }, [])

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) return{...task, completed: !task.completed}

      return task;
    })
    setTasks(newTasks)
  }

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks, 
      {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]
    setTasks(newTasks)
  }

  const handleTaskDeletion = (taskId) => {

    const newTasks = tasks.filter(task => task.id !== taskId)

    setTasks(newTasks)
  }

  return (
    // 1H:10 VIDEO
    <Router> 
    <div className="container">
      <Header/>
      <Route path="/" 
      exact // filtro exato
      render= {() => (
        <>
          <AddTask handleTaskAddition={handleTaskAddition} />
          <Tasks tasks={tasks} 
          handleTaskClick={handleTaskClick}  
          handleTaskDeletion={handleTaskDeletion}
          /> 
        </>
        )} 
      />
      <Route path="/:taskTitle" exact component={TaskDetails}></Route>
    </div> 
    </Router>
  );
};

export default App;