import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lzrzrzzmaqgojftpjzce.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6cnpyenptYXFnb2pmdHBqemNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMzc1OTcsImV4cCI6MjA3ODYxMzU5N30.OadWlHRjWBnp92RKUcG4mXH9XSY0FSFHIns0KpB7tSk"
);

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Uploading...");
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from("avatars").upload(fileName, file);
    if (error) return setStatus("Upload failed!");

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    setImageUrl(data.publicUrl);
    setStatus("Upload successful!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4 w-full file:py-2 file:px-4 file:bg-blue-600 file:text-white rounded-lg cursor-pointer"
      />

      <p className="text-gray-600 mb-4">{status}</p>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" className="w-48 h-48 mx-auto object-cover rounded shadow" />
          <p className="mt-2 text-xs text-gray-600 break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
