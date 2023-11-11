import { useState } from 'react'
import './App.css'

import { Route,
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider,
        } from 'react-router-dom'

import { Quiz } from './assets/Componentes/Quiz'

import { Home }from './assets/Componentes/Home'

import { Categories, CategoriesLoader } from './assets/Componentes/Categories'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='categories' 
                element={<Categories/>}
                loader={CategoriesLoader}/>
            <Route path='categories/:id' element={<Quiz/>}/>
            <Route path='stats'/>
        </Route>
    )
)


function App() {
    
    return(
        <>
        <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App
