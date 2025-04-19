import React, { useState, useRef, useEffect } from "react";
import Globe from "vanta/dist/vanta.globe.min";
import Transcript from "./Transcript";

const Start = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);

  const handleToggle = async () => {
    if (!isMicOn) {
      // Start mic
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        streamRef.current = stream;
        sourceRef.current = source;

        setIsMicOn(true);
        console.log("Mic started");
      } catch (err) {
        alert("Mic access denied: " + err.message);
      }
    } else {
      // Stop mic
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        await audioContextRef.current.close();
      }

      setIsMicOn(false);
      console.log("Mic stopped");
    }
  };

  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Globe({
          el: myRef.current,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  const [isOn, setIsOn] = useState(false);
  const toggleButton = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className="w-full h-auto min-h-screen flex justify-center items-center flex-col gap-20 py-32"
      ref={myRef}>
      <div className="inset-0 top-0 left-0 absolute bg-black/60"></div>
      <button
        onClick={handleToggle}
        className="bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 text-2xl md:text-3xl font-bold text-white rounded-full py-16 px-5 transition-all duration-300 hover:scale-95">
        CLICK HERE TO START <br /> HEAR AID
      </button>
      <Transcript />
      <div className="z-50 flex md:flex-row flex-col gap-5 justify-center items-center py-10">
        <h1 className=" text-2xl md:text-3xl text-white">
          Language Translation
        </h1>
        <div
          onClick={toggleButton}
          className="w-[100px] h-[50px] rounded-full bg-white relative overflow-hidden border-white border cursor-none">
          <div
            onClick={toggleButton}
            className={`w-[50px] h-[50px] rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 absolute top-0 ${
              isOn ? "translate-x-full" : "translate-x-0"
            } transition-all duration-300 pointer cursor-none`}></div>
        </div>
      </div>
      {isOn && (
        <div className="flex justify-center items-center gap-3 md:gap-5 text-white z-50">
          <div className="px-2 md:px-4 py-5 text-lg rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 flex-shrink-0 cursor-none">
            Translate From
          </div>
          <i className="ri-arrow-right-fill text-3xl md:text-5xl font-black"></i>
          <div className="px-2 md:px-4 py-5 text-xl rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 cursor-none flex-shrink-0">
            Translate To
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
