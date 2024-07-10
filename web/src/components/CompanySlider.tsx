"use client";

import React from "react";
import Slider from "react-infinite-logo-slider";

interface CompanySliderProps {
  toRight?: boolean;
}

const CompanySlider: React.FC<CompanySliderProps> = ({ toRight }) => {
  return (
    <div className="w-full max-w-xl p-4">
      <Slider
        width="250px"
        duration={30}
        pauseOnHover={false}
        blurBorders={false}
        toRight={toRight ? true : false}
        blurBorderColor="#fff"
      >
        <Slider.Slide>
          <h1>Slide 1</h1>
        </Slider.Slide>
        <Slider.Slide>
          <h1>Slide 2</h1>
        </Slider.Slide>
        <Slider.Slide>
          <h1>Slide 3</h1>
        </Slider.Slide>
        <Slider.Slide>
          <div>Other component...</div>
        </Slider.Slide>
      </Slider>
    </div>
  );
};

export default CompanySlider;
