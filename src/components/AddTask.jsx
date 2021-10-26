import React, { useState } from 'react';
import "./AddTask.css"
import Button from './Button';


const AddTask = ({handleTaskAddition}) => {
    const [inputData, setInputData] = useState('')

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        const inputElement = e.target.value.trim()
        setInputData(inputElement)
    };

    // minuto 45 video
    const handleAddTaskClick = () => {
        handleTaskAddition(inputData)
        setInputData("")
    }

    return(
    <>
    <div className="add-task-container">
        <input 
        onChange={handleInputChange}
        value={inputData} 
        className="add-task-input" 
        type="text" 
        />
        <div className="add-task-button-container">
        <Button onClick={handleAddTaskClick}>Adcionar</Button>
        </div>
    </div>
    </>
 )
    
}

export default AddTask;