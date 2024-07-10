"use client";

import Slider from "react-infinite-logo-slider";

const CompanySlider: React.FC = () => {
  return (
    <div>
      <Slider
        width="250px"
        duration={30}
        pauseOnHover={false}
        blurBorders={false}
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
