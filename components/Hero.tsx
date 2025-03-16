import React from "react";
import { TextGenerate } from "./TextGenerate";
import { Beams } from "./Beams";

function Hero() {
  return (
    <div>
      <div className="flex flex-col relative justify-center items-center mt-4">
        <div className="z-10 text-2xl top-[30%] md:text-6xl lg:text-8xl absolute md:top-[40%] p-10 ">
          {/* animate like universe of wealth */}
          <TextGenerate words={`Welcome to the Future`} />
        </div>
        <div className="z-10 absolute text-2xl top-[60%] md:text-6xl lg:text-8xl md:top-[65%] text-color-brand">
          <TextGenerate words={`E-RANTY`} />
        </div>
        <div className="circle-wrap">
          <div className="ic1-w-h  circle-style"></div>
        </div>

        <div className="circle2-wrap">
          <div className="ic2-w-h circle2-style"></div>
        </div>

        <div className="circle3-wrap">
          <div className="ic3-w-h circle-style "></div>
        </div>
        <Beams />
      </div>
    </div>
  );
}

export default Hero;
