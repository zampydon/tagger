import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './page/Home.jsx';
import TagPost from './page/TagPost.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"></Route>
            <Route index element={<Home/>} />
            <Route path="tagpost" element={<TagPost/>}/>
        </Routes>
      </BrowserRouter>
   
    </>
  )
}

export default App
