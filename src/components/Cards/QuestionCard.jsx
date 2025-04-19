import React, { useState, useRef, useEffect } from "react";

const QuestionCard = ({ props }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [option, setOption] = useState("");
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0); // NEW: Progress %

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleOption = (prop) => {
    if (prop === option) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
    setOption(prop);
  };

  // NEW: Handle progress tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 1;
      setProgress((current / duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      setIsPlaying(false); // reset play button when audio ends
      setProgress(0); // reset progress
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => {});
    };
  }, []);

  return (
    <div className="md:px-20 py-5">
      <p className="text-xl md:text-2xl text-white">
        Q{props.id}. Can you hear this sound?
      </p>

      <div className="flex justify-start items-center gap-5 py-5 md:px-9">
        <i
          onClick={handlePlayPause}
          className={`text-6xl cursor-pointer ${
            isPlaying
              ? "text-red-600 ri-stop-circle-line"
              : "text-green-500 ri-play-circle-line"
          }`}></i>
        <audio ref={audioRef} src={props.audio} typeof="audio/mp3" />

        {/* Progress bar container */}
        <div className="relative h-1 bg-white w-[300px] overflow-hidden rounded-full">
          {/* Filled bar */}
          <div
            className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-200"
            style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex justify-center md:justify-start items-center gap-10 md:px-32 ">
        <div
          onClick={() => toggleOption("Yes")}
          className={`text-black ${
            option === "Yes" && counter % 2 !== 0 ? "bg-green-500" : "bg-white"
          } text-xl font-medium p-5 rounded-full cursor-pointer`}>
          Yes
        </div>
        <div
          onClick={() => toggleOption("No")}
          className={`text-black ${
            option === "No" && counter % 2 !== 0 ? "bg-red-500" : "bg-white"
          } text-xl font-medium py-5 px-6 rounded-full cursor-pointer`}>
          No
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
