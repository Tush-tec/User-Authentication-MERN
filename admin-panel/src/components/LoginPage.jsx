import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const login = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });

    // If login is successful, store the token and navigate to the admin page
    localStorage.setItem("token", res.data.token);
    navigate("/admin");
  } catch (err) {
    // Check if the error response is from the backend and handle accordingly
    if (err.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      if (err.response.status === 401) {
        alert("Invalid credentials, please check your email and password.");
      } else {
        alert(`Login failed with error: ${err.response.data.msg || err.response.statusText}`);
      }
    } else if (err.request) {
      // The request was made but no response was received
      alert("No response from the server. Please try again later.");
    } else {
      // Something happened in setting up the request
      alert("Error in making the login request. Please try again.");
    }
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={login} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
