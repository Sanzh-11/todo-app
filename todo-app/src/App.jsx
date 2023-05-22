import { useState } from 'react'
import axios from 'axios'  
import './App.css'

const Task = ({ children, onDelete }) => {
  return (
    <li className="task">
      <span>{children}</span>
      // Домашнее задание: реализовать удаление задачи из списка
      <button type='button' onClick={onDelete}>X</button>
    </li>
  )
}

//asd

const TodoList = () => {
  const [tasks, setTasks] = useState([ 'Buy milk', 'Walk with the dog' ])
  const [taskText, setTaskText] = useState('')

  useEffect(() => {
    axios.get('http:/localhost:5173/tasks')
    .then(res => setTasks(res.data))
    .catch(console.error) 
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const prevTasks = tasks.concat()

    axios.post('http://localhost:5173/tasks', {
      task: taskText,
    })
    .catch(e => {
        setTasks(prevTasks) 
        alert(e) 
    })

    setTasks([ ...tasks, taskText ])
    setTaskText('')
  }
  const handleDelete = (idx) => {
    const prevTasks = tasks.concat()
    axios.delete('http://localhost:5173/tasks', {
      id: idx,
    })
    .catch(e => {
      setTasks(prevTasks) 
      alert(e) 
    })
    
    setTasks(tasks.filter((task, taskIdx) => taskIdx !== idx));
  }  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={taskText}
          onChange={e => setTaskText(e.target.value)}
          placeholder='Add a new task'
        />

        <ul>
          {tasks.map((task, idx) => (
            <Task 
              key={task + idx}
              onDelete={() => handleDelete(idx)} 
            />  
          ))}
        </ul>
      </form>
    </>
  )
}

export const App = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}


