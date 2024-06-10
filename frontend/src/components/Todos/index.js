import React from 'react'
import "./index.css"

const Todos = (props) => {
    const {eachTodo,deleteTodo,setupdate,setvalue,setcurrent_id} = props
    const {text,_id} = eachTodo

    const updateTodo = ()=>{
      setvalue(text)
          setupdate(true)
          setcurrent_id(_id)
    }

    const deleteTodoId = ()=>{
      deleteTodo(_id);
    }
  return (
    <div className='todos'>
      <p>{text}</p>
      <div>
      <button onClick={updateTodo}>✏️</button>
      <button onClick={deleteTodoId}>🗑️</button>
      </div>
    </div>
  )
}

export default Todos
