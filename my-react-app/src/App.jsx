import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PasswordReset from './pages/PassRes.jsx'
import NewPassword from './pages/Newpass.jsx'
import ProfilePage from './pages/Profile.jsx'
import ChangePass from './pages/changePass.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/resetlink/:uid/:token" element={<NewPassword />} />
        <Route path="/userprofile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePass />} />
      </Routes>
    </Router>

  )
}

export default App