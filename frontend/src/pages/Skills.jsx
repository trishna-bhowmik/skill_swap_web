import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroBg from '../assets/bgImage.jpg';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/users/skills");
        setSkills(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleClick = (skillId) => {
    navigate(`/skills/${skillId}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${heroBg})`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Available Skills
        </h1>

        {loading ? (
          <p className="text-center text-gray-200">Loading skills...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : skills.length === 0 ? (
          <p className="text-center text-gray-200">No skills available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <div
                key={skill._id}
                onClick={() => handleClick(skill._id)}
                className="cursor-pointer bg-white/90 border border-blue-200 rounded-lg p-4 hover:shadow-lg hover:bg-blue-100 transition duration-200 ease-in-out"
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  {skill.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {skill.specialization || "No specialization provided"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
