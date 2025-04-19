import React, { useState, useRef } from "react";

const QuestionCard = ({ props }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Reference for the audio element
  const [option, setOption] = useState("");
  const [counter, setCounter] = useState(0);
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio if it's playing
    } else {
      audioRef.current.play(); // Play the audio if it's paused
    }
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };
  const toggleOption = (prop) => {
    if (prop == option) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
    setOption(prop);
  };

  return (
    <div className="md:px-20 py-5">
      <p className="text-xl md:text-2xl text-white">
        Q{props.id}. Can you hear this sound?
      </p>
      <div className="flex justify-start items-center gap-5 py-5 md:px-9">
        <i
          onClick={handlePlayPause}
          className={`text-6xl ${
            isPlaying
              ? "text-red-600 ri-stop-circle-line"
              : "text-green-500 ri-play-circle-line"
          }`}></i>
        <audio ref={audioRef} src={props.audio} typeof="audio/mp3" />
        <div className="h-1 bg-white w-[300px]"></div>
      </div>
      <div className="flex justify-center md:justify-start items-center gap-10 md:px-32 ">
        <div
          onClick={() => toggleOption("Yes")}
          className={`text-black ${
            option == "Yes" && counter % 2 != 0 ? "bg-green-500" : "bg-white"
          } text-xl font-medium p-5 rounded-full`}>
          Yes
        </div>
        <div
          onClick={() => toggleOption("No")}
          className={`text-black ${
            option == "No" && counter % 2 != 0 ? "bg-red-500" : "bg-white"
          } text-xl font-medium py-5 px-6 rounded-full`}>
          No
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
