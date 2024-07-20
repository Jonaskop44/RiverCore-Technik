/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "@/components/Hero";
import Brands from "@/components/Brands/Brands";
import Feature from "@/components/Features/Feature";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import Reviews from "@/components/Reviews/Reviews";
import Pricing from "@/components/Pricing";

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
      <CTA />
      <Pricing />
      <Reviews />
    </>
  );
};

export default Home;
