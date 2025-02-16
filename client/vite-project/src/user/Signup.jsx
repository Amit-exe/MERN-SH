import React, { useState } from "react";
import create from "./api-user";
import InputField from "../components/InputField"; // Import the reusable InputField component

function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fix handleChange to update state properly
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password || !user.name) {
      setError("* All fields are required");
      return;
    }

    setError("");
    setIsLoading(true);

    const res = await create(user);
    console.log(res);

    setIsLoading(false);
  };

  return (
    <div className="m-8 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-4 rounded-2xl shadow-md w-80"
      >
        <InputField
          name="name" // ✅ Ensure name is provided
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          error={error}
        />
        <InputField
          name="email" // ✅ Ensure name is provided
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          error={error}
        />
        <InputField
          name="password" // ✅ Ensure name is provided
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          error={error}
        />

        <button
          className={`px-5 py-2 rounded-xl text-xl text-white transition-all ${
            user.email && user.password
              ? "bg-emerald-500 active:bg-emerald-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!user.email || !user.password || isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-600 text-lg p-4">{error}</p>}
    </div>
  );
}

export default Signup;
