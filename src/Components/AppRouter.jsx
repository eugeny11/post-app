import React, { useContext } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import About from '../Pages/About'
import Posts from '../Pages/Posts'
import Error from '../Pages/Pages'
import PostIdPage from '../Pages/PostIdPage'
import { publicRoutes, privateRoutes } from './Router/routes'
import { AuthContext } from '../Context'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
    const {isAuth, isLoading, setIsAuth} = useContext(AuthContext)
    if (isLoading){
        return <Loader/>
    }
    return(
        isAuth
        ?
        <Routes>
        {privateRoutes.map(route => 
            <Route 
            element={route.element}
            path={route.path}
            exact={route.exact}
            />
        )}
        </Routes>
        :
        <Routes>
          {publicRoutes.map(route => 
            <Route 
            element={route.element}
            path={route.path}
            exact={route.exact}
            />
        )}  
        <Route path="/" render={() => <Navigate to="login" />} />
        </Routes>
        
    )
}

export default AppRouter