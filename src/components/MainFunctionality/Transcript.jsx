import React, { useEffect, useRef, useState } from "react";

const Transcript = () => {
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false); // Track listening state

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
      setTranscript((prev) => prev + " " + result);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      // Automatically restart if still supposed to be listening
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
    isListeningRef.current = true;
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    isListeningRef.current = false;
    recognitionRef.current?.stop();
  };

  return (
    <div className="p-4 w-[300px] mx-auto z-50 bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 rounded-xl">
      <h1 className="text-xl text-white font-bold mb-4">
        Live English Transcript
      </h1>
      <div className="bg-gray-100 p-4 rounded h-48 overflow-y-auto border border-gray-300 ">
        <p>{transcript}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={startListening}
          className="px-4 py-2 bg-green-500 text-white rounded">
          Start
        </button>
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Stop
        </button>
      </div>
    </div>
  );
};

export default Transcript;
