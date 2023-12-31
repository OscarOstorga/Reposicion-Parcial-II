import { useState } from 'react'
import './App.css'

import { Route,
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider,
        } from 'react-router-dom'



import { Quiz } from './assets/Componentes/Quiz/Quiz'

import { Home }from './assets/Componentes/Home'

import { Categories, CategoriesLoader } from './assets/Componentes/Categories'
import { View } from './assets/Componentes/Stats/View'
import { Attempts } from './assets/Componentes/Stats/Attempts'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='categories' 
                element={<Categories/>}
                loader={CategoriesLoader}/>
            <Route path='categories/quiz' element={<Quiz/>}/>
            <Route path='attempts' element={<Attempts/>}/>
            <Route path='attempts/:id' element={<View/>}/>
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
