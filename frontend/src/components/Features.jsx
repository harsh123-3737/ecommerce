import React from "react";
import { Headphones, Shield, Truck } from "lucide-react";
function Features() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Shipping */}
          <div className="flex items-center space-x-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-50 cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over$50</p>
            </div>
          </div>
          {/* Secure Payment */}
          <div className="flex items-center space-x-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-50 cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 bg-green-100 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-muted-foreground">100% secure transactions</p>
            </div>
          </div>
          {/* 24/7 Support */}
          <div className="flex items-center space-x-4 p-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-50 cursor-pointer">
            <div className="flex items-center justify-center h-12 w-12 bg-purple-100 rounded-full">
              <Headphones className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">
                We're here anytime you need us
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
