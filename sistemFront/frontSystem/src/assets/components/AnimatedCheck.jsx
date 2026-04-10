import { useEffect, useState } from "react";

export default function AnimatedCheck({ show, message }) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div className="bg-white p-6 rounded-full shadow-lg flex items-center justify-center animate-bounce gap-2">
        
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>

        <span>{message}</span>
      </div>
    </div>
  );
}