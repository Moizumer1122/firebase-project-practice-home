import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

export default function addUser() {
  const [form, setFormData] = useState({ name: "", age: "", country: "" });
  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const randomId= Math.random().toString(36).slice(2);
    // Add a new document with a generated id.
// Add a new document in collection "cities"
try {
  await setDoc(doc(firestore, "users",randomId),form);
  console.log(randomId);
  
} catch (error) {
  console.log(error);
  
}

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-6 transition hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          User Information
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          >
            <option value="">Select country</option>
            <option>USA</option>
            <option>India</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>
      
    </div>
  );
}
