import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    avatar: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setForm({ ...form, avatar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Signup successful! You can now login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed: ' + (err?.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-blue-400 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Normal Style Avatar Input */}
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-700 mb-1 font-medium">
              Avatar
           </label>
          <input
             type="file"
             name="avatar"
             accept="image/*"
             onChange={handleChange}
             className="block w-full text-sm text-gray-700 
               file:mr-4 file:py-2 file:px-4 
               file:rounded file:border-0 
               file:text-sm file:font-semibold 
               file:bg-blue-500 file:text-white 
               hover:file:bg-blue-600 
               border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
