import React from "react";
import { FaHotel, FaUtensils, FaSpa, FaShuttleVan, FaWifi } from "react-icons/fa";

const services = [
  {
    icon: <FaHotel size={40} className="text-blue-600" />,
    title: "Luxury Rooms",
    description: "Experience ultimate comfort with our well-furnished luxury rooms."
  },
  {
    icon: <FaUtensils size={40} className="text-blue-600" />,
    title: "Multi-cuisine Restaurant",
    description: "Enjoy delicious food prepared by top chefs from around the world."
  },
  {
    icon: <FaSpa size={40} className="text-blue-600" />,
    title: "Relaxing Spa",
    description: "Rejuvenate your body and mind with our premium spa treatments."
  },
  {
    icon: <FaShuttleVan size={40} className="text-blue-600" />,
    title: "Airport Shuttle",
    description: "We offer convenient airport pickup and drop-off services."
  },
  {
    icon: <FaWifi size={40} className="text-blue-600" />,
    title: "Free Wi-Fi",
    description: "Stay connected with our high-speed complimentary Wi-Fi."
  },
];

const OurServices = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
