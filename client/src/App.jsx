import React from 'react';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Chat from './pages/Chat'

function App() {

  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/chat" element={<Chat/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App
