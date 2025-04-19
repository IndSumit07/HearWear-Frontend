import React, { useState, useRef } from "react";

const QuestionCard = ({ props, onAnswer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [option, setOption] = useState("");
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    onAnswer(props.freq, selectedOption); // send selected option and frequency
  };

  return (
    <div className="md:px-20 py-5">
      <p className="text-xl md:text-2xl text-white">
        Q{props.id}. Can you hear this sound ({props.freq} Hz)?
      </p>
      <div className="flex justify-start items-center gap-5 py-5 md:px-9">
        <i
          onClick={handlePlayPause}
          className={`text-6xl ${
            isPlaying
              ? "text-red-600 ri-stop-circle-line"
              : "text-green-500 ri-play-circle-line"
          }`}></i>
        <audio ref={audioRef} src={props.audio} type="audio/mp3" />
        <div className="h-1 bg-white w-[300px]"></div>
      </div>
      <div className="flex justify-center md:justify-start items-center gap-10 md:px-32">
        <div
          onClick={() => handleOptionClick("Yes")}
          className={`text-black ${
            option === "Yes" ? "bg-green-500" : "bg-white"
          } text-xl font-medium p-5 rounded-full`}>
          Yes
        </div>
        <div
          onClick={() => handleOptionClick("No")}
          className={`text-black ${
            option === "No" ? "bg-red-500" : "bg-white"
          } text-xl font-medium py-5 px-6 rounded-full`}>
          No
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
