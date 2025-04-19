import React, { useState, useRef, useEffect } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import hearwear from "../assets/HearWear Logo.png";

const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div
      ref={myRef}
      className="relative w-full min-h-screen h-auto px-5 md:px-40 py-10 md:py-12 z-50">
      <div className="inset-0 top-0 left-0 absolute bg-black/50"></div>
      <div>
        <img className="w-[300px] z-50" src={hearwear} alt="HearWear" />
      </div>
      <div>
        <h1 className="text-white text-3xl md:text-5xl tracking-widest font-bold mt-5">
          <span>HEARING AID FOR</span>
          <br />
          <span>PARTIAL DEAF AND</span>
          <br />
          <span>LIVE TRANSLATER</span>
          <br />
          <span>AND TRANSCRIPTOR</span>
        </h1>
      </div>
      <div className="text-white text-xl md:text-2xl font-[montserrat] mt-6  w-[250px]  md:w-[500px]">
        HearWear is a smart in-ear device that functions as both a hearing aid
        for partial deafness and a real-time language translator. It enhances
        sound clarity and breaks language barriers, offering a seamless and
        accessible communication experience.
      </div>
    </div>
  );
};

export default Hero;
