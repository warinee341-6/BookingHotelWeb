import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import PrivateRoute from './components/privateRoute'
import AdminPage from './pages/AdminPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Welcome />} />
        <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/search-results' element={<PrivateRoute><SearchResults/></PrivateRoute>} />
        <Route path='/adminPage' element={<PrivateRoute requiredRole="ADMIN"><AdminPage/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
