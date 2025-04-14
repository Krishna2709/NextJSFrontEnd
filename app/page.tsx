// 'use client';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { List, Clock, Github, Twitter, Facebook, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useState, useEffect } from 'react';

export default async function Home() {
  const { userId } = auth();
  const currentSlide = 0

  if (userId) {
    redirect("/screening");
  }
  else{
    redirect("/sign-in");
  }
  
  const slides = [
    {
      title: "Empowering Financial Decisions",
      subtitle: "Discover, analyze, and compare companies with ease."
    },
    {
      title: "Innovative Screener",
      subtitle: "Dive deep into financial trends and data insights."
    },
    {
      title: "Merger & Acquisition Assistance",
      subtitle: "Expert guidance for your business growth."
    }
  ];

  // const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [slides.length]);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">ExMachina</div>
          <ul className="flex space-x-4">
            <li>
              <a href="#hero" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="#search" className="hover:underline">Search</a>
            </li>
            <li>
              <a href="#screener" className="hover:underline">Screener</a>
            </li>
            <li>
              <a href="#merger" className="hover:underline">M&amp;A</a>
            </li>
            <li>
              <a href="#reviews" className="hover:underline">Reviews</a>
            </li>
            <li>
            <Button asChild variant="outline" size="lg" className="text-lg rounded-md">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero Section with Slider */}
        <section
          id="hero"
          className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-300 text-white"
        >
          <div className="text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
            <p className="text-xl">{slides[currentSlide].subtitle}</p>
          </div>
        </section>

        {/* Search Companies Section */}
        <section
          id="search"
          className="py-16 bg-gradient-to-r from-purple-400 "
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Search Companies</h2>
            <p className="mb-8">
              Find detailed financial insights and company profiles quickly.
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Enter company name"
                className="border p-2 rounded-l-md w-1/3 focus:outline-none"
              />
              <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Company Screener Section */}
        <section
          id="screener"
          className="py-16 bg-gradient-to-r "
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Company Screener</h2>
            <p className="mb-8">
              Analyze and compare companies with our advanced screening tools.
            </p>
            <button className="bg-white text-purple-500 px-6 py-2 rounded-md hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </section>

        {/* Merger & Acquisition Assistance Section */}
        <section
          id="merger"
          className="py-16 bg-gradient-to-r from-red-500 to-gray-300 text-white"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Merger &amp; Acquisition Assistance</h2>
            <p className="mb-8">
              Get expert guidance and support for your mergers and acquisitions.
            </p>
            <button className="bg-white text-red-500 px-6 py-2 rounded-md hover:bg-gray-100">
              Get Assistance
            </button>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          id="reviews"
          className="py-16 bg-gradient-to-r from-gray-700 to-gray-500 text-white"
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Reviews</h2>
            <p className="mb-8">
              No reviews yet. Be the first to review our services!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-8 text-white">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} ExMachina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

