import React from 'react';
import { Users, Truck, Shield, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Twin Gain
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Empowering producers and consumers through direct trade
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Direct Connection</h3>
              <p className="mt-2 text-base text-gray-500">
                We eliminate middlemen by connecting producers directly with consumers, ensuring better prices for both parties.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Quality Assurance</h3>
              <p className="mt-2 text-base text-gray-500">
                Every product on our platform is verified for quality and authenticity, ensuring you get the best.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Heart className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Supporting Local</h3>
              <p className="mt-2 text-base text-gray-500">
                By choosing Twin Gain, you support local producers and help sustain traditional crafts and farming.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center">Our Producers</h3>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rajesh Kumar",
                type: "Handicraft Artisan",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
                description: "Master craftsman specializing in traditional Indian handicrafts with 20 years of experience."
              },
              {
                name: "Priya Sharma",
                type: "Organic Farmer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
                description: "Certified organic farmer growing pesticide-free vegetables and fruits."
              },
              {
                name: "Mohammad Ismail",
                type: "Textile Weaver",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
                description: "Third-generation weaver creating handloom textiles using traditional techniques."
              }
            ].map((producer) => (
              <div key={producer.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={producer.image}
                    alt={producer.name}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-medium text-gray-900">{producer.name}</h4>
                  <p className="text-sm text-primary-600">{producer.type}</p>
                  <p className="mt-2 text-base text-gray-500">{producer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-primary-50 rounded-lg px-6 py-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Join Our Community</h3>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're a producer looking to reach customers directly or a consumer seeking quality products,
              Twin Gain is here to help you succeed.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/producer/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Join as Producer
              </a>
              <a
                href="/consumer/login"
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Join as Consumer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}