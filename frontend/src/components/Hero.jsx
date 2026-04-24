import React from "react";
import { Button } from "./ui/Button";
function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center md:items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Latest EcoFriendly Items at Best Prices
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Step into a greener future with our exclusive range of
              eco‑friendly products — blending innovation, sustainability, and
              style at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent "
              >
                View Deals
              </Button>
            </div>
          </div>
          <div className="relative overflow-visible flex justify-center items-center">
            <img
              src="/Ecom-hero7.png"
              alt=""
              width={500}
              height={400}
              className="w-full max-w-md rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.5)] object-contain mt-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
