import React, { useState } from "react";
import myIcon from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const newUser = {username: username, email: email, password: password};   

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, newUser);
      if (response.status === 201) {
        console.log(response.data);          
        localStorage.setItem("token", response.data.token);
        setUsername("")
        setEmail("");
        setPassword("");

        navigate("/home");
         
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-[88vh] w-full bg-gradient-to-br from-black via-[#1a1a2e] to-gray-600 relative overflow-hidden font-raleway mt-3 rounded-xl">
      <img src={myIcon} alt="my-logo-icon" className="h-25 w-25 py-2 px-4" />

      {/* Remove min-h-screen here, since parent already has h-screen */}
      <div className="relative z-10 flex items-start justify-center h-[85vh]">
        {/* Reduced padding, removed min-h from children */}
        <div className="bg-white rounded-xl shadow-xl p-4 w-[90%] max-w-4xl flex flex-col md:flex-row h-[90%]">
          {/* Left Panel */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-black via-[#1a1a2e] to-gray-800 text-white pt-5 px-5 rounded-xl relative">
            <div className=" min-h-screen flex flex-col">
              <h2 className="text-2xl font-bold mb-2 text-center  ">
                Explore the World of Code
              </h2>

              <div className="absolute bottom-0 my-2">
                <h2 className="text-xl font-semibold text-center">
                  Learn. Share. Inspire
                </h2>
                <p className="text-sm text-gray-500 font-semibold w-[100%] text-left">
                  CodeNest is your space to explore tech blogs, publish
                  insights, and stay ahead in development. Learn from the best.
                  Contribute your voice.
                </p>
              </div>
            </div>
            {/* Your other <p> elements stay same */}
          </div>

          {/* Right Panel - Signup Form */}
          <div className="h-min w-full md:w-1/2 bg-white p-6 rounded-xl overflow-y-auto -mt-3 relative">
            <h2 className="text-2xl font-bold mb-2 text-left text-[#2c2828f1]">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 font-semibold text-left">
              Your connections are just few steps away
            </p>

            <div className="flex items-center justify-start gap-8 my-5">
              <img
                className="h-5 w-5 cursor-pointer"
                src="https://www.shareicon.net/data/512x512/2016/07/10/119930_google_512x512.png"
                alt="google-icon"
              />
              <img
                className="h-5 w-5 cursor-pointer"
                src="https://images.vexels.com/media/users/3/223136/isolated/preview/984f500cf9de4519b02b354346eb72e0-facebook-icon-social-media-by-vexels.png"
                alt="facebook-icon"
              />
            </div>
            <p className="text-sm text-left font-medium text-gray-500 my-4">
              Or sign up with
            </p>

            <form onSubmit={handleSubmit}>
              <input
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                placeholder="username"
                className="w-full mb-3 px-5 py-2 border rounded-full font-medium focus:outline-[#dcd9ff] placeholder:text-sm"
              />
              
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="email"
                className="w-full mb-3 px-5 py-2 border rounded-full font-medium focus:outline-[#dcd9ff] placeholder:text-sm"
              />
               
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                placeholder="password"
                className="w-full mb-3 px-5 py-2 border rounded-full font-medium focus:outline-[#dcd9ff] placeholder:text-sm"
              />
               

              <button className="my-3 font-medium w-full bg-gradient-to-r from-[#6171ED] to-[#7575e2] text-white py-2 rounded-full hover:bg-[#5191ED] transition">
                Sign Up
              </button>

              <p className="text-xs font-medium text-[#796dec] my-2">
                Already have an account ?{" "}
                <span className="text-[#384df0] font-medium text-xs">
                  <Link to={"/login"}>Log in</Link>{" "}
                </span>
              </p>
            </form>
            <p className="text-[10px] font-medium text-gray-400">
              By signing up you agree to the{" "}
              <span className="text-gray-600">Terms of Services </span>and{" "}
              <span className="text-gray-600"> Data Processing Agreement</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
