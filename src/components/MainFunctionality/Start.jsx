import React, { useState, useRef, useEffect } from "react";
import Globe from "vanta/dist/vanta.globe.min";
import Transcript from "./Transcript";

const Start = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isTranscriptOn, setIsTranscriptOn] = useState(false);
  const [stream, setStream] = useState(null);

  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  const toggleTranscript = () => setIsTranscriptOn((prev) => !prev);

  const handleToggleMic = async () => {
    if (!isMicOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        sourceRef.current = source;
        setStream(stream);
        setIsMicOn(true);
        console.log("Mic and playback started");
      } catch (err) {
        alert("Mic access denied: " + err.message);
      }
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        await audioContextRef.current.close();
      }

      audioContextRef.current = null;
      sourceRef.current = null;
      setStream(null);
      setIsMicOn(false);
      console.log("Mic and playback stopped");
    }
  };

  // Vanta Background
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(Globe({ el: myRef.current }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      className="w-full h-auto min-h-screen flex justify-center items-center flex-col gap-16 py-28"
      ref={myRef}>
      <div className="inset-0 top-0 left-0 absolute bg-black/60"></div>

      <button
        onClick={handleToggleMic}
        className="bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 text-2xl md:text-3xl font-bold text-white rounded-full py-16 px-5 transition-all duration-300 hover:scale-95">
        CLICK HERE TO START <br /> HEAR AID
      </button>

      {/* Transcript Switch */}
      <div className="z-50 flex md:flex-row flex-col gap-5 justify-center items-center py-10">
        <h1 className=" text-2xl md:text-3xl text-white">
          Real Time Transcript
        </h1>
        <div
          onClick={toggleTranscript}
          className="w-[100px] h-[50px] rounded-full bg-white relative overflow-hidden border-white border cursor-pointer">
          <div
            className={`w-[50px] h-[50px] rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 absolute top-0 ${
              isTranscriptOn ? "translate-x-full" : "translate-x-0"
            } transition-all duration-300`}></div>
        </div>
      </div>

      {/* Transcript Display */}
      {isTranscriptOn && <Transcript isOn={isTranscriptOn} isMicOn={isMicOn} />}
    </div>
  );
};

export default Start;
