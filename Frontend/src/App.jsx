import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper'; 
import UserLogout from './pages/UserLogout';
import Start from './pages/Start';
 

function App() {
  

  return (
   
    <Routes>
       <Route path='/' element={<Start/>}></Route>
      <Route path="/home" element={<UserProtectedWrapper><Home /></UserProtectedWrapper> }></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/signup" element={<UserSignUp />}></Route>
      <Route path="/logout" element={<UserLogout />}></Route>       
    </Routes>
  );
}

export default App
