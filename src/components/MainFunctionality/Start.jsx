import React, { useState, useRef, useEffect } from "react";
import Halo from "vanta/dist/vanta.halo.min";

const Start = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Halo({
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
      className="w-full h-screen flex justify-center items-center flex-col gap-5"
      ref={myRef}>
      <div className="inset-0 top-0 left-0 absolute bg-black/60"></div>
      <button className="bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 text-2xl md:text-3xl font-bold text-white rounded-full py-16 px-5">
        CLICK HERE TO START <br /> HEAR AID
      </button>
      <div className="z-50 flex md:flex-row flex-col gap-5 justify-center items-center py-10">
        <h1 className=" text-2xl md:text-3xl text-white">
          Language Translation
        </h1>
        <div
          onClick={toggleButton}
          className="w-[100px] h-[50px] rounded-full bg-white relative overflow-hidden border-white border cursor-pointer">
          <div
            onClick={toggleButton}
            className={`w-[50px] h-[50px] rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 absolute top-0 ${
              isOn ? "translate-x-full" : "translate-x-0"
            } transition-all duration-300 pointer cursor-pointer`}></div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 md:gap-5 text-white">
        <div className="px-2 md:px-4 py-5 text-lg rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 cursor-pointer flex-shrink-0">
          Translate From
        </div>
        <i className="ri-arrow-right-fill text-3xl md:text-5xl font-black"></i>
        <div className="px-2 md:px-4 py-5 text-xl rounded-full bg-gradient-to-l from-purple-500 via-pink-600 to-blue-500 cursor-pointer flex-shrink-0">
          Translate To
        </div>
      </div>
    </div>
  );
};

export default Start;
