import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"
import Todos from './components/Todos'
import { Url } from './components/Url/url'

const App = () => {

  const [todos,setTodos] = useState([])
  const [newtodo,setnewTodo] = useState("");
  const [isupdating,setupdate] = useState(false);
  const [current_id,setcurrent_id] = useState(null)
  

  const DeleteTodo = async(_id)=>{
    
     await axios.delete(`${Url}/delete`,{data: { _id: _id }});
    

    const filterData = todos.filter(each=>each._id!==_id);
    setTodos(filterData)
    
   

  }

  const addTodo = async()=>{
    if(newtodo===""){
      alert("Todo Not is Empty");
      return 
    }
    if(isupdating){
      console.log(isupdating)
      await updateText(current_id);
    }
   else{
    const newtodoData = {
      "text":newtodo
    }

    const response = await axios.post(`${Url}save/`,newtodoData);
    console.log(response)
    setTodos(prev=>[...prev,newtodoData])
    setnewTodo("")
   
    
   }
   
  }

  const updateText = async(_id)=>{
    await axios.put(`${Url}/update`,{_id,text:newtodo})
    // console.log(response.data)
    const updatedTodos = todos.map(each=>{
      if(each._id===_id){
        return {...each,text:newtodo}
      }
      return each
    })

    setTodos(updatedTodos);
    setnewTodo("")
    setupdate(false);
    

    
  }

  useEffect(()=>{
    const getData = async()=>{
      const response = await axios.get(Url);
      console.log(response)
      const data = response.data;
      setTodos(data)
    }
    getData()
      
  },[])

  return (
    <div className='container'>
    
      <h1>Todos App</h1>
      <div className='top'>
        <input type='text' placeholder='Add Todos...' value={newtodo} 
        onChange={(e)=>setnewTodo(e.target.value)}/>
        <button className='add-button' onClick={addTodo}>{isupdating? "Update":"Add"}</button>
      </div>

       {todos.length!==0?<ul>
        {todos.map(each=>(
          <Todos key={each._id} 
          eachTodo={each}
           deleteTodo = {DeleteTodo} 
          
          setvalue={setnewTodo} 
          setupdate={setupdate}
          setcurrent_id={setcurrent_id}
          />
          
        ))}
       </ul>:<p>No Todos Available</p>}
   
    </div>
  )
}

export default App
