import React, { useState } from 'react';
import './App.css';


type Props = {}

interface item { 
  id:number,
  name:string,
  lastname:string,
  status:number
}

export default function App({}: Props) {
  const [todo , setToDo] = useState<item[]>([]);
  let [todoFind , setToDoFind] = useState<item[]>([])
  const [name , setName] = useState<string>("")
  const [lastName , setLastName] = useState<string>("")
  const [editName , setEditName] = useState<string>("")
  const [editLastName , setEditLastName] = useState<string>("")
  const [value , setValue] = useState<string>("")

  const addPerson = () =>{
    const newToDo:item = {
      id: + new Date(),
      name: name,
      lastname: lastName,
      status: 1
    }
    setToDo([...todo , newToDo]);
    setName("");
    setLastName("");
  }

  const editPerson =(index:number) =>{
    todo[index].status = 8;
    setEditName(todo[index].name);
    setEditLastName(todo[index].lastname);
    setToDo([...todo]);
  }

  const savePerson = (index:number) =>{
    todo[index].name = editName;
    todo[index].lastname = editLastName;
    todo[index].status = 1;
    setToDo([...todo]);
  }

  const removePerson = (index:number) =>{
    todo.splice(index , 1);
    setToDo([...todo]);
  }

  const backEdit = (index:number) =>{
    todo[index].status = 1;
    setToDo([...todo]);
  }

  const findData = (event:React.ChangeEvent<HTMLInputElement>)=> {
    setValue(event.target.value);
    let textFind = event.target.value;
    if (textFind.length > 2){
      const array = todo.filter((todo) => todo.name.includes(textFind) || todo.lastname.includes(textFind));
      todoFind = array;
      setToDoFind([...todo])
    }
  }

  return (
    <div>App to do list

      <ul>
        {
          todo.map((todo:item, index:number) => {
            if(todo.status === 1) {
              return (
                <li key={todo.id}>
                  ชื่อ: {todo.name}
                  นามสกุล: {todo.lastname}
                  <button className='bg-yellow-500 hover bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => editPerson(index)}>Edit</button>
                  <button className='bg-red-500 hover bg-red-500 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => removePerson(index)}>Remove</button>
                </li>
              )
            }else{
              return (
                <li key={todo.id}>
                  ชื่อ: <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline none focus:boder-indigo-500 border-solid border-2 mx-3' type="text" value={editName} onChange={(e) => setEditName(e.target.value)}></input>
                  นามสกุล: <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline none focus:boder-indigo-500 border-solid border-2 mx-3' type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)}></input>
                  <button className='bg-indigo-500 hover bg-indigo-500 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => savePerson(index)}>Save</button>
                  <button className='bg-indigo-500 hover bg-indigo-500 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={() => backEdit(index)}>Back</button>
              </li>
              );
            }
          })
        }
      </ul>

      <form className='mt-3 mb-3'>
        <label>ชื่อ : </label>
        <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline none focus:boder-indigo-500 border-solid border-2 mx-3' type="text" value={name} onChange = {(e) => setName(e.target.value)}></input>
        <label>นามสกุล : </label>
        <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline none focus:boder-indigo-500 border-solid border-2 mx-3' type="text" value={lastName} onChange = {(e) => setLastName(e.target.value)}></input>
      </form>
        <button className='bg-blue-500 hover bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 mt-4' onClick={addPerson}>Add person</button>

        <div>
          
        </div>
        <div className='mt-3 mb-3'>
          <h3> Search
            <input className='w-1/5 h-10 px-3 rounded-md border-gray-300 focus:outline none focus:boder-indigo-500 border-solid border-2 mx-3' type="text" value={value} onChange={findData}></input>
            <ul>
              {
                todoFind.map((todo:item) => {
                  return (
                    <li key={todo.id}>
                      name: {todo.name}
                      lastname: {todo.lastname}
                    </li>
                  )
                })
              }
            </ul>
          </h3>
        </div>

    </div>
  )
}