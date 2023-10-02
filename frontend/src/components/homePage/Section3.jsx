import React from "react";
import icon from "../../icons/836.jpg"

const Section3 = () => {
  const testimonials = [
    {
      name: "John Doe",
      testimonial:
        "I found immense relief and support through the counseling sessions on Mint. It has truly changed my life.",
      image: icon,
    },
    {
      name: "Jane Smith",
      testimonial:
        "Mint helped me manage my anxiety in ways I never thought possible. I'm grateful for the guidance.",
      image: icon,
    },
  ];
  return (
    <>
      <div className="py-16 bg-green-opacity px-6 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg shadow-xl p-6 bg-white hover:bg-gray-100 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-20 w-20 object-cover rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 mb-2">{testimonial.testimonial}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
