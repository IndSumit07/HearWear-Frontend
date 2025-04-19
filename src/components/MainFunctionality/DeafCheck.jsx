import React, { useEffect, useState } from "react";
import hearwear from "../../assets/HearWear Logo.png";
import QuestionCard from "../Cards/QuestionCard";
import audio1 from "../../assets/Sounds/500.mp3";
import audio2 from "../../assets/Sounds/1000.mp3";
import audio3 from "../../assets/Sounds/1500.mp3";
import audio4 from "../../assets/Sounds/2000.mp3";
import audio5 from "../../assets/Sounds/4000.mp3";
import { Link } from "react-router-dom";

const DeafCheck = () => {
  const [noFreqs, setNoFreqs] = useState([]);

  const sounds = [
    { id: 1, audio: audio1, freq: 500 },
    { id: 2, audio: audio2, freq: 1000 },
    { id: 3, audio: audio3, freq: 1500 },
    { id: 4, audio: audio4, freq: 2000 },
    { id: 5, audio: audio5, freq: 4000 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (freq, answer) => {
    setNoFreqs((prev) => {
      if (answer === "No") {
        if (!prev.includes(freq)) return [...prev, freq];
      } else {
        return prev.filter((f) => f !== freq);
      }
      return prev;
    });
  };

  const getDeafnessPercentage = (selectedFreqs) => {
    const sorted = [...selectedFreqs].sort((a, b) => a - b);
    const freqStr = sorted.join("+");

    const mappings = {
      250: 10,
      "500+1000": 30,
      "500+1000+2000": 50,
      "1000+2000+4000": 80,
      "500+1000+1500+2000+4000": 100,
      "500+4000": 40,
      1000: 25,
      "": 0, // If no "No" answers = no deafness
    };

    return mappings[freqStr] || 30; // default if combination not found
  };

  return (
    <div className="w-full min-h-screen h-auto bg-gradient-to-l from-[#17174a] to-[#4b025d] md:py-20 md:px-40 px-5 py-10">
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
          <QuestionCard key={sound.id} props={sound} onAnswer={handleAnswer} />
        ))}
      </div>

      <div className="px-20 py-10 flex flex-col md:justify-start justify-center gap-4">
        {noFreqs.length > 0 && (
          <div className="text-white text-xl space-y-2">
            <p>
              You responded "No" to frequencies:{" "}
              <span className="font-bold text-red-300">
                {noFreqs.join(", ")} Hz
              </span>
            </p>
            <p>
              Partial Deafness Detection:{" "}
              <span className="font-bold text-yellow-400">
                {getDeafnessPercentage(noFreqs)}%
              </span>
            </p>
          </div>
        )}
        <Link
          to="/start"
          className="text-lg bg-green-600 px-6 py-3 rounded-full md:min-w-[420px] transition-all duration-300 hover:scale-95 text-center">
          Submit
        </Link>
      </div>
    </div>
  );
};

export default DeafCheck;
