import React, { useEffect, useRef, useState } from "react";

const Transcript = ({ isOn, isMicOn }) => {
  const [transcript, setTranscript] = useState("");
  const [hindiTranscript, setHindiTranscript] = useState("");
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

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
      const updatedTranscript = transcript + " " + result;
      setTranscript(updatedTranscript);
      translateToHindi(updatedTranscript);
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
  }, [transcript]);

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

  // Auto start/stop when props change
  useEffect(() => {
    if (isOn && isMicOn) {
      startListening();
    } else {
      stopListening();
    }
  }, [isOn, isMicOn]);

  return (
    <div className="p-4 w-[350px] mx-auto z-50 bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 rounded-xl">
      <h1 className="text-xl text-white font-bold mb-2">
        Live English Transcript
      </h1>
      <div className="bg-gray-100 p-3 rounded h-32 overflow-y-auto border border-gray-300 mb-3 text-sm">
        <p>{transcript}</p>
      </div>

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
  );
};

export default Transcript;
