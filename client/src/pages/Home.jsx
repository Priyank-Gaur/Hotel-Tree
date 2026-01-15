import React from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import RecommendedDestinations from "../components/RecommendedDestinations";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/NewsLetter";
import HotelReg from "../components/HotelReg";

const Home = () => {
  const [showRegModal, setShowRegModal] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <>
      <Hero setShowRegModal={setShowRegModal} />
      <RecommendedDestinations />
      <FeaturedDestination/>
      <ExclusiveOffers />
      <Testimonial/>
      {}
      {showRegModal && <HotelReg setShowRegModal={setShowRegModal} />}
    </>
  );
};

export default Home;
