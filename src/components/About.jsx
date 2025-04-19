import React from "react";
import bubble from "../assets/BuggleGif.gif";
import bg from "../assets/Bg-2.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      id="about"
      className="w-full h-auto 2xl:h-screen bg-cover px-5 md:px-20 py-10 xl:py-16 flex md:flex-row flex-col"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full md:w-1/2 h-1/2">
        <img src={bubble}></img>
      </div>
      <div className="w-full md:w-1/2 xl:h-screen h-auto text-white px-5 lg:px-10">
        <h1 className="text-5xl font-[montserrat] leading-tight">
          About <br /> HearWear
        </h1>
        <p className="text-xl font-base mt-5">
          HearWear is an innovative project designed to revolutionize
          communication for individuals with partial hearing loss. It functions
          both as a hearing aid and a real-time language translator, all
          operated seamlessly through in-ear devices such as earbuds or
          earphones. By enhancing ambient sounds and converting speech into
          amplified, clearer audio, HearWear aids those with partial deafness in
          better understanding their surroundings. Simultaneously, its built-in
          live translation feature allows users to break language barriers,
          making conversations across different languages more accessible.
          Compact, user-friendly, and smart, HearWear offers a discreet yet
          powerful solution for inclusive communication in today’s connected
          world.
        </p>
        <Link to="/check">
          <button className="mt-5 bg-[#D73CBE] px-6 py-8 rounded-full text-black text-2xl font-medium hover:scale-90 transition-all duration-300">
            CLICK HERE TO START
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
