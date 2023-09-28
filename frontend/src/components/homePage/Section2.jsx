import React from "react";
import first from '../../icons/21118463_6428537.svg'
import second from '../../icons/13297285_5184245.svg'
import third from '../../icons/22874405_6686835.svg'

const Section2 = () => {
  const cardData = [
    {
      title: "Mindful Breathing",
      description:
        "Practice deep breathing to calm your mind and reduce stress.",
      image: first,
    },
    {
      title: "Guided Meditation",
      description:
        "Listen to soothing guided meditation sessions for relaxation.",
      image: second,
    },
    {
      title: "Nature Walk Visualization",
      description:
        "Imagine taking a calming walk through a peaceful natural setting.",
      image: third,
    },
  ];
  return (
    <>
      <div className="py-16 bg-green-opacity px-5">
        <div className="flex justify-center mb-10">
          <div className="h-2 w-72  bg-gray-900"></div>
        </div>
        <div className="container mx-auto mt-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What we do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-32 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
