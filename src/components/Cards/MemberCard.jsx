import React from "react";

const MemberCard = ({ image, name }) => {
  return (
    <div className="transition-all duration-300 hover:scale-105">
      <div className="md:w-[300px] md:h-[300px] w-[250px] h-[250px] bg-white rounded-3xl bg-cover overflow-hidden cursor-pointer">
        <img className="h-full w-full" src={image} alt="" />
      </div>
      <div className="text-center text-white mt-5  text-2xl tracking-wider">
        {name}
      </div>
    </div>
  );
};

export default MemberCard;
