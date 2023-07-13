"use client";

import React from "react";
// import Slider from 'react-slick';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sdata from "./Sdata";

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  appendDots?: (dots: React.ReactNode) => React.ReactNode;
}

const Slideshow = () => {
  const settings: SliderSettings = {
    dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
          return <ul style={{ margin: "0px" }}>{dots}</ul>
        },
  };

  return (
    <div className="slideshow">
      <Slider {...settings}>
         <div>
          <img src="/hero.png" alt="Slide 1" className="w-full h-auto" />
        </div>
        {/*<div>
          <img src="/hero.png" alt="Slide 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="/hero.png" alt="Slide 3" className="w-full h-auto" />
        </div> */}
        
      </Slider>
    </div>
  );
};

export default Slideshow;
