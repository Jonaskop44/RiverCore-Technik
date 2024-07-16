/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "@/components/Hero";
import Brands from "@/components/Brands/Brands";
import Feature from "@/components/Features/Feature";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Integration />
    </>
  );
};

export default Home;
