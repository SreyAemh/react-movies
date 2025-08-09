import './css/App.css'
import Favorites from './pages/Favorites'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import { UserProvider } from './contexts/UserContext'
import NavBar from './components/NavBar'

function App() {


  return (
    <UserProvider>
      <MovieProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </MovieProvider>
    </UserProvider>
  )
}

export default App
