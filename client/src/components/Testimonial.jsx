import React from "react";
import { testimonials, assets } from "../assets/assets";
import Title from "./Title";

const Testimonial = () => {
  return (
    <div className="mx-6 md:mx-16 lg:mx-24 my-20">
      <Title
        title="What Our Guests Say"
        subTitle="Hear from our happy customers about their stay"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-lg rounded-lg p-6 bg-white cursor-pointer hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{testimonial.address}</p>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <img key={i} src={assets.starIconFilled} alt="star" className="w-5 h-5" />
                ))}
              </div>

               <p className="text-gray-600 text-center text-sm leading-relaxed">
                "{testimonial.review}"
               </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
