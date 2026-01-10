import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import HotelReg from "../components/HotelReg";

const Home = () => {
  const [showRegModal, setShowRegModal] = React.useState(false);

  return (
    <>
      <Hero setShowRegModal={setShowRegModal} />
      <FeaturedDestination/>
      <ExclusiveOffers />
      <Testimonial/>
      <Newsletter/>
      {showRegModal && <HotelReg setShowRegModal={setShowRegModal} />}
    </>
  );
};

export default Home;
