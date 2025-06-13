import React, { useState } from "react";
import myIcon from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      if (response.status == 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" rounded-xl h-[90vh] w-full bg-gradient-to-br from-black via-[#1a1a2e] to-gray-600 relative overflow-hidden font-raleway">
      <img src={myIcon} alt="my-logo-icon" className="h-25 w-25 py-2 px-4" />

      {/* Remove min-h-screen here, since parent already has h-screen */}
      <div className="relative z-10 flex items-start justify-center h-[85vh]">
        {/* Reduced padding, removed min-h from children */}
        <div className="bg-white rounded-xl shadow-xl p-4 w-[90%] max-w-4xl flex flex-col md:flex-row h-[90%]">
          {/* Left Panel */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-black via-[#1a1a2e] to-gray-800 text-white p-6 rounded-xl relative">
            <div className=" min-h-screen flex flex-col">
              <h2 className="text-2xl font-bold mb-2 text-center  ">
                Explore the World of Code
              </h2>

              <div>
                <h2 className="text-xl font-semibold">Learn. Share. Inspire</h2>
                <p className="text-sm text-gray-500 font-semibold  ">
                  CodeNest is your space to explore tech blogs, publish
                  insights, and stay ahead in development. Learn from the best.
                  Contribute your voice.
                </p>
              </div>
            </div>
            {/* Your other <p> elements stay same */}
          </div>

          {/* Right Panel - Signup Form */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl overflow-y-auto relative">
            <h2 className="text-2xl font-bold mb-2 text-left text-[#2c2828f1]">
              Log In
            </h2>

            <div className="my-12">
              <i className="ri-mail-line absolute left-[9%] top-[24%] text-lg text-[#7064f3]"></i>
              <form onSubmit={handleSubmit}>
                <input
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 px-10 py-2 border rounded-full font-medium focus:outline-[#dcd9ff] placeholder:text-sm"
                />
                <i className="ri-lock-line absolute left-[9%] top-[45%] text-lg text-[#7064f3]"></i>
                <input
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                  className="w-full mb-3 px-10 py-2 border rounded-full font-medium focus:outline-[#dcd9ff] placeholder:text-sm my-10"
                />
                <p className="text-right font-medium text-[12px] text-[#7064F3] absolute right-0 mr-7  cursor-pointer">
                  <i className="ri-lock-unlock-line "></i> Forgot Password ?
                </p>

                <button className="my-9 font-medium w-full bg-gradient-to-r from-[#6171ED] to-[#7575e2] text-white py-2 rounded-full hover:bg-[#5191ED] transition">
                  Log in
                </button>
              </form>

              <p className="text-xs font-medium text-[#796dec]">
                New Here ?{" "}
                <span className="text-[#384df0] font-medium text-xs">
                  <Link to={"/signup"}>Sign Up</Link>
                </span>
              </p>

              <p className="text-[10px] font-medium text-gray-400 absolute bottom-0">
                By signing in you agree to the{" "}
                <span className="text-gray-600 cursor-pointer underline">
                  Terms of Services{" "}
                </span>
                and{" "}
                <span className="text-gray-600 cursor-pointer underline">
                  {" "}
                  Data Processing Agreement
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
