import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Header.jsx'
import Login from './Login.jsx'
import Chat from './Chat.jsx'
import ApplicantChat from './ApplicantChat.jsx' 
import Landing from './Landing.jsx'
import Recruiter from './Recruiter.jsx'
import Applicant from './Applicant.jsx' 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/applicant-chat" element={<ApplicantChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recruiter" element={<Recruiter />} /> 
          <Route path="/applicant" element={<Applicant />} /> 
        </Routes>
    </BrowserRouter>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// const [count, setCount] = useState(0)

{/* <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </> */}