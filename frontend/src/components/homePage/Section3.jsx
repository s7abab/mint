import React from "react";

const Section3 = () => {
  const testimonials = [
    {
      name: "John Doe",
      testimonial:
        "I found immense relief and support through the counseling sessions on Mint. It has truly changed my life.",
      image: "path-to-image1.jpg",
    },
    {
      name: "Jane Smith",
      testimonial:
        "Mint helped me manage my anxiety in ways I never thought possible. I'm grateful for the guidance.",
      image: "path-to-image2.jpg",
    },
  ];
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
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
