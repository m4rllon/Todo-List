import React, { useState } from 'react'
import './App.css';

function App() {

  const [input, setInput] = useState([])
  const [task, setTask] = useState('')
  const [todoEditing, setTodoEdting] = useState(null)
  const [editingText, setEditingText] = useState('')

  function addTask(e){
    e.preventDefault()
    console.log(typeof(task), task)
    const newTask = {
      date: new Date().getTime(),
      todo: task,
    }
    setInput([...input].concat(newTask))
    setTask('')
  }

  function deleteTask(date){
    const testTask = [...input].filter((task => task.date !== date))
    setInput(testTask)
  }

  function editTodo(date){
    const testEdit = [...input].map((task) => {
      if(task.date === date){
        task.todo = editingText
      }
      return task
    })
    setInput(testEdit)
    setTodoEdting(null)
    setEditingText('')
  }

  return (
    <div className="App">

      <h1> Lista de Tarefas</h1>
      
      <h3>Informe abaixo quais são seus planos:</h3>
      
      <form onSubmit={ addTask }>
      
        <input type='text' placeholder='Digite sua tarefa..' onChange={(e) => setTask(e.target.value)} value={ task }></input>
      
        <button className='but' type='submit'>Adicionar</button>
      
      </form>
      
      {input.map((task) => 
        <div id='lista' key={task.date}>

            <span id='check'><input type='checkbox'></input></span> 

            <span id='texto'>
              {todoEditing === task.date ? (<input type='text' onChange={ (e) => setEditingText(e.target.value) } value={ editingText }/>) : (<div>{ task.todo }</div>)}
            </span>
        
            <span id='but1'>{todoEditing === task.date ? (<button className='but' type='submit' onClick={() => editTodo(task.date)}>Salvar Edição</button>) : (<button className='but' type='submit' onClick={ () => setTodoEdting(task.date) }>Editar</button>) }
            
            <button className='but' onClick={ () => deleteTask(task.date) }>Excluir</button></span>
        
        </div>
      )}
    </div>
  );
}

export default App;
