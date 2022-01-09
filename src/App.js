import React, {useState, useEffect} from 'react'
import './Styles/App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './Components/UI/Navbar/Navbar'
import AppRouter from './Components/AppRouter'
import { AuthContext } from './Context'

function App(){
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')){
      setIsAuth(true)
      localStorage.setItem('auth', true)
    }
    setLoading(false)
  },[])

  return(
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <Router>
          <Navbar/>
          <AppRouter />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;