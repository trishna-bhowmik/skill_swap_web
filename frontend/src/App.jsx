import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddSkills from './pages/Addskills';
import UpdateProfile from './pages/UpdateProfile';
import Skills from './pages/Skills';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import People from './pages/People';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16"> {/* Offset for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/peoples" element={<People />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
