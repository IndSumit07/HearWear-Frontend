import React, { useEffect } from "react";
import hearwear from "../../assets/HearWear Logo.png";
import QuestionCard from "../Cards/QuestionCard";
import audio1 from "../../assets/Sounds/500.mp3";
import audio2 from "../../assets/Sounds/1000.mp3";
import audio3 from "../../assets/Sounds/1500.mp3";
import audio4 from "../../assets/Sounds/2000.mp3";
import audio5 from "../../assets/Sounds/4000.mp3";
import { Link } from "react-router-dom";
const DeafCheck = () => {
  const sounds = [
    {
      id: 1,
      audio: audio1,
    },
    {
      id: 2,
      audio: audio2,
    },
    {
      id: 3,
      audio: audio3,
    },
    {
      id: 4,
      audio: audio4,
    },
    {
      id: 5,
      audio: audio5,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen h-auto bg-gradient-to-l from-[#17174a] to to-[#4b025d] md:py-20 md:px-40 px-5 py-10 placeholder-opacity-100">
      <img className="w-[300px]" src={hearwear} alt="HearWear" />
      <h1 className="text-white text-2xl md:text-4xl py-5 mt-2 font-black font-[Arial] md:ml-5">
        Questions to detect Level of Partial Deafness
      </h1>
      <div className="md:ml-20 py-5 flex md:justify-start justify-center items-center">
        <Link to="/start" className="text-lg bg-white px-5 py-3 rounded-full">
          Skip if already done
        </Link>
      </div>
      <div className="space-y-20">
        {sounds.map((sound) => (
          <QuestionCard props={sound} />
        ))}
      </div>
    </div>
  );
};

export default DeafCheck;
