import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroBg from '../assets/bgImage.jpg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/users/current-user", {
        withCredentials: true,
      });
      setUser(data?.data?.user);
    } catch (error) {
      console.error("Profile fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-20 text-white text-xl">Loading...</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        {/* Avatar + Name */}
        <div className="flex items-center space-x-5">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold">{user.fullname}</h2>
            <p className="text-sm opacity-80">@{user.username}</p>
            <p className="text-sm">{user.location || "Location not set"}</p>
          </div>
        </div>

        <hr className="my-6 border-white/30" />

        {/* Bio */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-sm">
            {user.bio || "You haven’t added a bio yet."}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          {user.skills?.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-80">No skills added yet.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/update-profile")}
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600/70 transition"
          >
            Update Profile
          </button>

          <button
            onClick={() => navigate("/add-skills")}
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600/70 transition"
          >
            Add Skills
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600/70 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
