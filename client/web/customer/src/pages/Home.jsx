import React from "react";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import BookAppointment from "../Components/BookAppointment";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Slider from "../Components/Slider";

function Home() {
  return (
    <div>
      <Header />
      <Slider />
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <Footer />
    </div>
  );
}

export default Home;
