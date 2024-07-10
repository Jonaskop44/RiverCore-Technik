// global.d.ts
declare module "react-infinite-logo-slider" {
  import * as React from "react";

  interface SliderProps {
    width?: string;
    duration?: number;
    pauseOnHover?: boolean;
    blurBorders?: boolean;
    blurBorderColor?: string;
    children?: React.ReactNode;
  }

  interface SlideProps {
    children?: React.ReactNode;
  }

  const Slider: React.FC<SliderProps> & {
    Slide: React.FC<SlideProps>;
  };

  export default Slider;
}
