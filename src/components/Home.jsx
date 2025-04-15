import React from "react";
import Hero from "./Hero";
import About from "./About";
import OurTeam from "./OurTeam";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <OurTeam />
    </div>
  );
};

export default Home;
