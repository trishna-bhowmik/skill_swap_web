import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSkills = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User is not logged in.");
      return;
    }

    const skillPayload = {
      skills: [formData],
    };

    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/update-skills",
        skillPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Skill added successfully!");

      // Reset form
      setFormData({
        name: "",
        specialization: "",
      });

      // Redirect to profile after a short delay (optional)
      setTimeout(() => {
        navigate("/profile");
      }, 1000); // 1 second delay for better UX

    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add skill.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a Skill</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkills;
