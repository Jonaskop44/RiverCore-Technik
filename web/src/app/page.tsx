/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "@/components/Hero";
import Brands from "@/components/Brands/Brands";
import Feature from "@/components/Features/Feature";
import About from "@/components/About";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <Feature />
      <About />
    </>
  );
};

export default Home;
