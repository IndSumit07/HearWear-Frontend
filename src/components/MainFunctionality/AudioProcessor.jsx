import React, { useEffect } from "react";
import { io } from "socket.io-client";

function AudioProcessor() {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("✅ Connected to backend");
    });

    socket.on("cleaned_audio", (cleanedBase64) => {
      console.log("✅ Cleaned Audio Received:", cleanedBase64);

      // Convert base64 string to audio and play it
      const audioData = new Uint8Array(
        atob(cleanedBase64)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      const audioBlob = new Blob([audioData], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });

    // Start microphone stream
    const startMicStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const float32Array = new Float32Array(inputData);
        const byteArray = new Uint8Array(float32Array.buffer);
        const base64Audio = btoa(String.fromCharCode(...byteArray));
        socket.emit("audio_chunk", base64Audio); // Send audio chunk
        console.log("📤 Sent mic audio chunk");
      };
    };

    startMicStream();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>🎤 React Voice Cleaner</h1>
      <p>Check console for logs (F12)</p>
    </div>
  );
}

export default AudioProcessor;
