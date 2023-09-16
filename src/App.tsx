import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Main from './components/Main/Main'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <div className="">hello</div>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App
