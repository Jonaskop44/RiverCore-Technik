/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "@/components/Hero";
import Brands from "@/components/Brands/Brands";
import Feature from "@/components/Features/Feature";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab/FeaturesTab";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <Feature />
      <About />
      <FeaturesTab />
    </>
  );
};

export default Home;
