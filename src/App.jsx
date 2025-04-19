import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Start from "./components/MainFunctionality/Start";
import "./index.css";
import Transcript from "./components/MainFunctionality/Transcript";
import DeafCheck from "./components/MainFunctionality/DeafCheck";

const App = () => {
  const coords = useRef({ x: 0, y: 0 });
  const circlesRef = useRef([]);

  useEffect(() => {
    const circles = circlesRef.current;
    const colors = [
      "#ffb56b",
      "#fdaf69",
      "#f89d63",
      "#f59761",
      "#ef865e",
      "#ec805d",
      "#e36e5c",
      "#df685c",
      "#d5585c",
      "#d1525c",
      "#c5415d",
      "#c03b5d",
      "#b22c5e",
      "#ac265e",
      "#9c155f",
      "#950f5f",
      "#830060",
      "#7c0060",
      "#680060",
      "#60005f",
      "#48005f",
      "#3d005e",
    ];

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
      circle.style.position = "fixed";
      circle.style.pointerEvents = "none";
      circle.style.width = "20px";
      circle.style.height = "20px";
      circle.style.borderRadius = "50%";
      circle.style.zIndex = 9999;
      circle.style.opacity = `${1 - index / circles.length}`;
    });

    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 8}px`;
        circle.style.top = `${y - 8}px`;
        circle.style.transform = `scale(${
          (circles.length - index) / circles.length
        })`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.25;
        y += (nextCircle.y - y) * 0.25;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {[...Array(21)].map((_, i) => (
        <div
          key={i}
          className="hidden lg:flex circle"
          ref={(el) => (circlesRef.current[i] = el)}
        />
      ))}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/check" element={<DeafCheck />} />
      </Routes>
    </div>
  );
};

export default App;
