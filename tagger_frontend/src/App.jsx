import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Buyer from './page/Buyer.jsx'
import Market from './page/Market.jsx'
import Tag from './page/Tag.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Buyer/>
        <Market/>
        <Tag/>
      </div>  
    </>
  )
}

export default App
