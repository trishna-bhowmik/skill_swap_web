// src/pages/People.jsx
import React, { useState } from "react";
import heroBg from '../assets/bgImage.jpg';

const People = () => {
  const [people] = useState([
    {
      id: "1",
      name: "Aarav Sharma",
      location: "Delhi, India",
      avatar: "https://i.pravatar.cc/150?img=5",
      skills: ["Python", "Data Science", "Machine Learning"],
    },
    {
      id: "2",
      name: "Meera Patel",
      location: "Mumbai, India",
      avatar: "https://i.pravatar.cc/150?img=6",
      skills: ["UI/UX Design", "Figma", "Photoshop"],
    },
    {
      id: "3",
      name: "Rohan Das",
      location: "Bangalore, India",
      avatar: "https://i.pravatar.cc/150?img=7",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "4",
      name: "Ananya Gupta",
      location: "Kolkata, India",
      avatar: "https://i.pravatar.cc/150?img=8",
      skills: ["Digital Marketing", "SEO", "Content Writing"],
    },
  ]);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${heroBg})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          People with Skills
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-500"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {person.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{person.location}</p>

              <div className="flex flex-wrap justify-center gap-2">
                {person.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
