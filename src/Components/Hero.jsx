import React from "react";

const Hero = ({ img, text }) => {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-64 md:h-80 lg:h-96"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            {text}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
