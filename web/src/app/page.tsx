/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "@/components/Hero";
import Brands from "@/components/Brands/Brands";
import Feature from "@/components/Features/Feature";

const Home = () => {
  return (
    <div>
      <Hero />
      <Brands />
      <Feature />
    </div>
  );
};

export default Home;
