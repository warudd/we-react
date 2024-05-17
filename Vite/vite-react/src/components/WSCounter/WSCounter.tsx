import React , {useState} from 'react'

type Props = {}

export default function WSCounter({}: Props) {
    const [count , setCount] = useState(0);

  return (
    <div>
        <div>{count}</div>
      <button onClick={()=> {setCount(count+1)}}>+</button>
      <button onClick={()=> {setCount(count-1)}}>-</button>
      <button onClick={()=> {setCount(0)}}>Reset</button>
    </div>
  )
}