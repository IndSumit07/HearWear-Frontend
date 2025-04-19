import React, { useState, useRef, useEffect } from "react";
import Globe from "vanta/dist/vanta.globe.min";

const Start = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isTranscriptOn, setIsTranscriptOn] = useState(false);
  const [isTranslatorOn, setIsTranslatorOn] = useState(false);

  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);

  const handleToggle = async () => {
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
        streamRef.current = stream;
        sourceRef.current = source;

        setIsMicOn(true);
        console.log("Mic started");
      } catch (err) {
        alert("Mic access denied: " + err.message);
      }
    } else {
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

  // Transcript & Translation
  const [transcript, setTranscript] = useState("");
  const [hindiTranscript, setHindiTranscript] = useState("");
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      isListeningRef.current = true;
    } catch (e) {
      console.warn("Start failed:", e.message);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      isListeningRef.current = false;
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript((prev) => {
        const updated = prev + " " + result;
        translateToHindi(updated);
        return updated;
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      isListeningRef.current = false;
    };
  }, []);

  const translateToHindi = async (text) => {
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      const translated = data[0].map((t) => t[0]).join("");
      setHindiTranscript(translated);
    } catch (err) {
      console.error("Translation failed:", err);
    }
  };

  useEffect(() => {
    if (isTranscriptOn && isMicOn) {
      startListening();
    } else {
      stopListening();
    }
  }, [isTranscriptOn, isMicOn]);

  // Vanta Background
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

  // Toggle switches
  const toggleTranslator = () => setIsTranslatorOn(!isTranslatorOn);
  const toggleTranscript = () => setIsTranscriptOn(!isTranscriptOn);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="w-full h-auto min-h-screen flex justify-center items-center flex-col gap-16 py-28 relative z-10"
      ref={myRef}>
      <div className="absolute inset-0 bg-black/60 z-20"></div>

      <button
        onClick={handleToggle}
        className="z-50 bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 text-2xl md:text-3xl font-bold text-white rounded-full py-16 px-5 transition-all duration-300 hover:scale-95">
        CLICK HERE TO START <br /> HEAR AID
      </button>

      {/* Transcript Toggle */}
      <div className="z-50 flex md:flex-row flex-col gap-5 justify-center items-center py-10">
        <h1 className="text-2xl md:text-3xl text-white">
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
      {isTranscriptOn && (
        <div className="z-50 p-4 w-[350px] mx-auto bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 rounded-xl">
          <h1 className="text-xl text-white font-bold mb-2">
            Live English Transcript
          </h1>
          <div className="bg-gray-100 p-3 rounded h-32 overflow-y-auto border border-gray-300 mb-3 text-sm">
            <p>{transcript}</p>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={startListening}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Start
            </button>
            <button
              onClick={stopListening}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Translator Toggle */}
      <div className="z-50 flex md:flex-row flex-col gap-5 justify-center items-center py-10">
        <h1 className="text-2xl md:text-3xl text-white">
          Language Translation
        </h1>
        <div
          onClick={toggleTranslator}
          className="w-[100px] h-[50px] rounded-full bg-white relative overflow-hidden border-white border cursor-pointer">
          <div
            className={`w-[50px] h-[50px] rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 absolute top-0 ${
              isTranslatorOn ? "translate-x-full" : "translate-x-0"
            } transition-all duration-300`}></div>
        </div>
      </div>

      {/* Translator UI Placeholder */}
      {isTranslatorOn && (
        <div className="z-50 p-4 w-[350px] mx-auto bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 rounded-xl">
          <h1 className="text-xl text-white font-bold mb-2">अनुवाद (Hindi)</h1>
          <div className="bg-gray-100 p-3 rounded h-32 overflow-y-auto border border-gray-300 text-sm">
            <p>{hindiTranscript}</p>
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <button
              onClick={startListening}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Start
            </button>
            <button
              onClick={stopListening}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Start;
