import React , {useState , useEffect} from 'react'

type Props = {}

const lifeCycleDemo = ({random}: any) => {
    
    useEffect(() => {
        console.log('I am side effect');
        return () =>{
            console.log('I am clean up effect');
        }
    });
    useEffect(() =>{
        console.log('I am after mount');
    },[]);

    useEffect(() =>{
        console.log('I am doing because random change');
    },[random]);

    return (
        <div>
            <p>I'm Demo</p>
        </div>
    )
}

export default function WSEffectDemo({}: Props) {

const [mount , setMount] = useState(true);
const [random , setRandom] = useState(Math.random());

const handleOnMount = () =>{
    setMount(!mount) //ถ้า Click จะเปิด Click อีกครั้งปิด 
}
const handleOnReRender = () =>{
    setRandom(Math.random())
}
  return (
    <div>
        <h4>Demo number: {random}</h4>
        <button onClick={handleOnReRender}>Re-render</button>
        <button onClick={handleOnMount}>Mount / Unmount</button>
        {mount && lifeCycleDemo({random})}
    </div>
  )
}