
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutOne from './Components/Layout/LayoutOne'
import SignUp from './Components/SignUp/SignUp'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'


function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path='/SinUp' element ={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<LayoutOne/>}>
          
        </Route>
      </Route>
    )
  )
 
  return (
    <>
      <RouterProvider router={myRoute}/>
      <ToastContainer/>

    </>
  )
}

export default App
