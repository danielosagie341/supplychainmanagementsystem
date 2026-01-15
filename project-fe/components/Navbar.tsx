"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";

const Navbar = () => {
  const segments = useSelectedLayoutSegments();

  let path = "";
  const crumbs = segments.map((segment, index) => {
    path += `/${segment}`;
    const label = decodeURIComponent(segment.replace(/-/g, " ")); // Optional formatting

    return (
      <span key={index} className="text-gray-600">
        <span className="mx-2">/</span>
        <Link
          style={{
            color: "rgba(16, 185, 129)",
          }}
          href={path}
          className="hover:underline"
        >
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Link>
      </span>
    );
  });
  return (
    <div
      className="w-full  dark:bg-neutral-800 hidden md:flex items-center fixed  bg-white pl-10"
      style={{ top: 0, right: 0, left: 0, zIndex: 20, height: 50 }}
    >
      <div className="w-1 h-8 bg-green-500 mr-3"></div>
      <Link
        style={{
          color: "rgba(16, 185, 129)",
        }}
        href="/"
        className="hover:underline text-blue-600"
      >
        Dashoboard
      </Link>
      {crumbs}
    </div>
  );
};

export default Navbar;
