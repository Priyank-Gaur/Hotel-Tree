import React from "react";
import { exclusiveOffers } from "../assets/assets";
import Title from "./Title";

const ExclusiveOffers = () => {
  return (
    <div id="exclusive-offers" className="mx-6 md:mx-16 lg:mx-24 my-20">
       <Title
        title="Exclusive Offers"
        subTitle="Unbeatable Deals for Your Next Dream Vacation"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {exclusiveOffers.map((offer) => (
          <div
            key={offer._id}
            className="relative rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
             <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>


            <div className="absolute bottom-6 left-6 text-white ">
              <p className="text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block mb-3">
                {offer.priceOff}% OFF
              </p>
              <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
              <p className="text-gray-200 text-sm mb-4 line-clamp-2 opacity-90">
                {offer.description}
              </p>
              <button className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
                Coming soon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
