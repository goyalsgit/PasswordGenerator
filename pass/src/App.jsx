import { useState ,useCallback,useEffect ,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length ,setLength] = useState(8)
  const [numsallowed , setnumsallowed] = useState(false)
  const [charallowed ,setcharallowed] =useState(false)
  const [password ,setPassword] = useState("")

  //useref hook
  const passref = useRef(null)

  const passgen = useCallback(()=>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numsallowed) str+="0123456789"
    if (charallowed) str+="!@#$%^&*(){}[]~`"

    for (let i = 1 ; i <=length ; i++){
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length ,numsallowed ,charallowed, setPassword])

  const copy_password_clipboard = useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passgen()},[length,numsallowed,charallowed,passgen])
  

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-4 my-6 text-orange-500 bg-gray-700 ">
        <div className='flex items-center gap-0.2'>
          <input 
          type="text"
          value={password}
          className=' text-orange-500 rounded-l-md rounded-r-none outline-none  w-full py-2 px-3 bg-white '    
          placeholder='password'
          readOnly
          ref={passref}
          />
          <button onClick={copy_password_clipboard} className='outline-none bg-blue-700 text-white px-4 py-2 rounded-r-md rounded-l-none py-0.5 shrink-0'>copy</button>
        </div>
        <div className=' mt-3 flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-3'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            
            />
            <label className='text-md'>Length:{length}</label>

            <input 
            type="checkbox"
            defaultChecked={numsallowed}
            id="numberInput" 
            onChange={()=>{
              setnumsallowed((prev) => !prev)
            }}/>
            <label className='text-white text-md'>Numbers</label>

             <input 
            type="checkbox"
            defaultChecked={charallowed}
            id="numberInput" 
            onChange={()=>{
              setcharallowed((prev) => !prev)
            }}/>
            <label className='text-white text-md'>SpecialChar </label>
          </div>

        </div>

      </div>
       
    </>
  )
}

export default App

//there is no reference between the input and the button so we use the use useRef hook to pass 