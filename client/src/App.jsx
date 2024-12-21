import Navbar from './components/Navbar'
import Login from './pages/Login'
import Chatroom from './pages/Chatroom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Chat" element={<Chatroom/>}/>
      </Routes>
    </Router>
  )
}

export default App
