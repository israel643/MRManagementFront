import { useState } from 'react'
import GeneralButtons from '../components/Buttons/General-Btn'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="container">
      <h1 className="text-center">¡Hola, Bootstrap 5 con React y Vite!</h1>
      <button className="btn btn-primary">Click me</button>
      <GeneralButtons textContent={'hola'}/>
    </div>
    </>
  )
}

export default App
