import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Buyer from './page/buyer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Buyer/>
      </div>  
    </>
  )
}

export default App
