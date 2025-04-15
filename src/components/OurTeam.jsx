import React, { useState, useRef, useEffect } from "react";
import Net from "vanta/dist/vanta.net.min";
import MemberCard from "./Cards/MemberCard";
import Sumit from "../assets/Sumit.jpg";
import Rohnish from "../assets/Rohnish.jpg";
import Harsh from "../assets/Harsh.jpg";
import Akarsh from "../assets/Akarsh.png";

const OurTeam = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Net({
          el: myRef.current,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={myRef} className="w-full h-auto min-h-screen p-20">
      <div className="inset-0 top-0 left-0 absolute bg-black/40"></div>
      <h1 className="text-5xl text-white text-center ">Our Team</h1>
      <div className="flex justify-center items-center mt-24 gap-20 md:gap-10 flex-wrap">
        <MemberCard image={Sumit} name={"Sumit Kumar"} />
        <MemberCard image={Rohnish} name={"Rohnish Srivastava"} />
        <MemberCard image={Harsh} name={"Harsh Dixit"} />
        <MemberCard image={Akarsh} name={"Aakarsh Kashyap"} />
      </div>
    </div>
  );
};

export default OurTeam;
