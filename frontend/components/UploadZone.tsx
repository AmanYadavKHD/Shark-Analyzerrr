"use client";

import { useState, useCallback } from "react";
import { Upload, FileAudio, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      // Store data in local storage or context (simple MVP approach)
      localStorage.setItem("analysisResults", JSON.stringify(data));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to analyze pitch. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
        isDragging
          ? "border-blue-500 bg-blue-50/10"
          : "border-gray-700 hover:border-blue-400 bg-gray-900/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 bg-blue-600/20 rounded-full">
          {isUploading ? (
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          ) : (
            <Upload className="w-10 h-10 text-blue-500" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            {isUploading ? "Analyzing Pitch..." : "Upload your Pitch Video/Audio"}
          </h3>
          <p className="text-gray-400 mt-2">
            Drag & drop or click to browse (MP3, WAV, MP4)
          </p>
        </div>
        <input
          type="file"
          accept="audio/*,video/*"
          className="hidden"
          id="file-upload"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <label
          htmlFor="file-upload"
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
            isUploading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Select File
        </label>
      </div>
    </div>
  );
}
