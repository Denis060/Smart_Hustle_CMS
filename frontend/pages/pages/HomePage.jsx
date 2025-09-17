// This file should be created at: frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
// This static data simulates what we'll fetch from our backend API later.
const mockSiteSettings = {
  tagline: "Blogs, Tutorials, and Curated Courses for the Data-Driven Future",
};

const mockFeaturedPost = {
  id: 1,
  title: "5 Common Mistakes Beginners Make in Deep Learning",
  imageUrl: "https://placehold.co/600x400/0f172a/94a3b8?text=Featured+Post",
  category: "Deep Learning",
  excerpt: "Are your models not converging? You might be making one of these five common mistakes. From improper weight initialization to choosing the wrong loss function, we break down the pitfalls...",
};

const mockFeaturedCourse = {
  id: 3,
  title: "Deep Learning Specialization",
  provider: "Coursera",
  review: "This is the foundational course that took me from understanding basic machine learning to truly grasping the 'how' and 'why' of deep learning. A non-negotiable for a career in AI.",
  affiliateLink: "#",
};

// --- Sub-components for the Homepage ---

const HeroSection = ({ tagline }) => (
  <section className="text-center py-20">
    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
      Smart Hustle with <span className="text-cyan-400">AI</span>
    </h1>
    <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
      {tagline}
    </p>
    <div className="mt-8 flex justify-center gap-4">
      <Link to="/blog" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
        Explore Blog
      </Link>
      <Link to="/my-courses" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
        View Courses
      </Link>
    </div>
  </section>
);

const FeaturedPost = ({ post }) => (
  <section className="py-16 bg-slate-800/50 rounded-xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white">Featured Post of the Week</h2>
      <div className="w-24 h-1 bg-cyan-500 mx-auto mt-2"></div>
    </div>
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <img src={post.imageUrl} alt={post.title} className="rounded-lg shadow-lg w-full h-full object-cover" />
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 mb-2">
          {post.category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-3">{post.title}</h3>
        <p className="text-slate-300 mb-4">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="font-bold text-cyan-400 hover:text-cyan-300">
          Read More &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const CourseHighlight = ({ course }) => (
  <section className="py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white">Course Highlight</h2>
      <div className="w-24 h-1 bg-cyan-500 mx-auto mt-2"></div>
    </div>
    <div className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-8 text-center shadow-2xl">
      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 mb-4">
        {course.provider}
      </span>
      <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
      <p className="text-slate-300 italic mb-6">"{course.review}"</p>
      <a href={course.affiliateLink} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 inline-block">
        Enroll Now
      </a>
    </div>
  </section>
);

const NewsletterSignup = () => (
    <section className="py-16 bg-slate-800/50 rounded-xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">Get Weekly AI & Data Insights</h2>
            <p className="text-slate-300 mt-2 mb-6">Join the "AI Hustle Digest" for free tools, tutorials, and the best learning resources.</p>
            <form className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email address" required className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg">
                    Subscribe
                </button>
            </form>
        </div>
    </section>
);


const HomePage = () => {
  return (
    <div className="space-y-16">
      <HeroSection tagline={mockSiteSettings.tagline} />
      <FeaturedPost post={mockFeaturedPost} />
      <CourseHighlight course={mockFeaturedCourse} />
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
