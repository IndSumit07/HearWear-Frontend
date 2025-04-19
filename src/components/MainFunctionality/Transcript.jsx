import React, { useEffect, useRef, useState } from "react";

const Transcript = ({ isOn, isMicOn }) => {
  const [transcript, setTranscript] = useState("");
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
      console.log("Heard:", result);
      setTranscript((prev) => prev + " " + result);
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
    if (isOn && isMicOn) {
      startListening();
    } else {
      stopListening();
    }
  }, [isOn, isMicOn]);

  return (
    <div className="p-4 w-[300px] mx-auto z-50 bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 rounded-xl">
      <h1 className="text-xl text-white font-bold mb-4">
        Live English Transcript
      </h1>
      <div className="bg-gray-100 p-4 rounded h-48 overflow-y-auto border border-gray-300">
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default Transcript;
