import {NavLink } from "react-router-dom";
const Start = () => {
return (
  <div className="min-h-[90vh] w-full relative font-raleway px-9 py-6  ">
    <div className="fixed w-[97%] h-[20%] flex items-start justify-between">
      <h2 className="text-[#0365FF] text-2xl font-semibold">CodeNest</h2>
      <div className="flex items-center justify-center gap-6 mr-5">
        <NavLink to={"/"} className="text-base font-semibold text-[#0365FF]">
          Home
        </NavLink>
        <NavLink to={"/home"} className="text-base font-semibold">
          About
        </NavLink>
        <NavLink to={"/home"} className="text-base font-semibold">
          Blog
        </NavLink>
        <NavLink to={"/home"} className="text-base font-semibold">
          Contact
        </NavLink>
        <NavLink
          to={"/home"}
          className="text-base font-semibold bg-blue-600 py-2 px-4 rounded-full text-white"
        >
          Get Started
        </NavLink>
      </div>
    </div>

    <div className="font-nunito absolute flex items-center justify-between top-[20%]">
      <div className="w-[43%]  ">
        <h2 className="text-5xl font-semibold text-[#323030]">
          Read, Write & publish your blogs with <span>CodeNest</span>
        </h2>
        <p className="font-medium text-sm text-gray-400 w-1/2] my-5">
          It's easy to and free to psot your thinking on any topic and connect
          with millions of readers.
        </p>
        <button className="px-4 py-2 bg-[#0365FF] rounded-lg">Publish your blog</button>
      </div>

      <div className="w-[50%]">
        <img
          className="h-[85%] w-[70%] rounded-lg"
          src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="simple-mac-book-img"
        />
      </div>
    </div>
  </div>
);
}

export default Start
