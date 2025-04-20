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
    const freqStr = sorted.join(",");

    const mappings = {
      250: 10,
      500: 15,
      1000: 25,
      2000: 25,
      4000: 25,
      "250,500": 25,
      "250,1000": 35,
      "250,2000": 35,
      "250,4000": 35,
      "500,1000": 40,
      "500,2000": 40,
      "500,4000": 40,
      "1000,2000": 50,
      "1000,4000": 50,
      "2000,4000": 50,
      "250,500,1000": 50,
      "250,500,2000": 50,
      "250,500,4000": 50,
      "250,1000,2000": 60,
      "250,1000,4000": 60,
      "250,2000,4000": 60,
      "500,1000,2000": 65,
      "500,1000,4000": 65,
      "500,2000,4000": 65,
      "1000,2000,4000": 75,
      "250,500,1000,2000": 75,
      "250,500,1000,4000": 75,
      "250,500,2000,4000": 75,
      "250,1000,2000,4000": 85,
      "500,1000,2000,4000": 90,
      "250,500,1000,2000,4000": 100,
      "": 0,
    };

    return mappings[freqStr] || 0;
  };

  return (
    <div className="w-full min-h-screen h-auto bg-gradient-to-l from-[#17174a] to-[#4b025d] md:py-20 md:px-40 px-5 py-10">
      <Link to="/">
        <img className="w-[300px]" src={hearwear} alt="HearWear" />
      </Link>

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

      <div className="md:px-20 py-10 flex flex-col md:justify-start justify-center gap-4">
        {noFreqs.length > 0 ? (
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
        ) : (
          <div className="text-white text-xl space-y-2">
            <p>
              You responded "Yes" to all frequencies.{" "}
              <span className="font-bold text-green-300">
                No Partial Deafness Detected ✅
              </span>
            </p>
            <p>
              Partial Deafness Detection:{" "}
              <span className="font-bold text-yellow-400">0%</span>
            </p>
          </div>
        )}

        <Link
          to="/start"
          className="text-lg bg-green-600 px-6 py-3 rounded-full md:min-w-[420px] transition-all duration-300 hover:scale-95 text-center">
          Click Here to Continue
        </Link>
      </div>
    </div>
  );
};

export default DeafCheck;
