import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRouter';
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
