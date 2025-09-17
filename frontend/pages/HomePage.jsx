// This file is located at: frontend/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Helper Components ---

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error on new submission

        try {
            const response = await fetch('http://localhost:3001/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                // Handle errors from the server, like duplicate emails
                throw new Error(data.message || 'Subscription failed.');
            }

            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (submitted) {
        return (
             <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 my-16 text-center">
                <h2 className="text-3xl font-bold text-white">Thank You!</h2>
                <p className="mt-2 text-cyan-400 max-w-2xl mx-auto">You're on the list. Keep an eye on your inbox for the next AI Hustle Digest.</p>
            </div>
        )
    }

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 my-16 text-center">
            <h2 className="text-3xl font-bold text-white">Get Smarter Every Week</h2>
            <p className="mt-2 text-slate-400 max-w-2xl mx-auto">Join the "AI Hustle Digest" for free tools, tutorials, and the best learning resources delivered straight to your inbox. No spam, just value.</p>
            <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                />
                <button type="submit" className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors duration-300">Subscribe</button>
            </form>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </div>
    );
};


const HomePage = () => {
    const [settings, setSettings] = useState(null);
    const [featuredPost, setFeaturedPost] = useState(null);
    const [featuredCourse, setFeaturedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomepageData = async () => {
            try {
                // Fetch site-wide settings, which includes the IDs for featured content
                const settingsRes = await fetch('http://localhost:5000/api/settings');
                if (!settingsRes.ok) throw new Error('Could not fetch settings');
                const settingsData = await settingsRes.json();
                setSettings(settingsData);

                // If featured IDs exist, fetch the corresponding post and course
                if (settingsData.featuredPostId) {
                    const postRes = await fetch(`http://localhost:5000/api/posts/${settingsData.featuredPostId}`);
                    if (!postRes.ok) throw new Error('Could not fetch featured post');
                    const postData = await postRes.json();
                    setFeaturedPost(postData);
                }

                if (settingsData.featuredCourseId) {
                    const courseRes = await fetch(`http://localhost:5000/api/courses/${settingsData.featuredCourseId}`);
                    if (!courseRes.ok) throw new Error('Could not fetch featured course');
                    const courseData = await courseRes.json();
                    setFeaturedCourse(courseData);
                }

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHomepageData();
    }, []); // The empty array ensures this effect runs only once when the component mounts

    if (loading) {
        return <div className="text-center py-20 text-slate-400">Loading Smart Hustle...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <header className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                    {settings?.siteTitle || 'Smart Hustle with AI'}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    {settings?.tagline}
                </p>
            </header>

            {/* Course Highlight */}
            {featuredCourse && (
                <section className="px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Course Highlight</h2>
                    <p className="text-center text-slate-400 mb-8">My top recommendation for aspiring AI developers.</p>
                    <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:transform hover:-translate-y-1 border border-slate-700 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                   {featuredCourse.provider.toUpperCase()}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-white">{featuredCourse.title}</h3>
                            </div>
                            {/* Level is not in the Course model, so this is commented out. We can add it later if needed. */}
                        </div>
                        <p className="mt-4 text-slate-400 text-sm">{featuredCourse.review}</p>
                        <div className="mt-6">
                            <a href={featuredCourse.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                                Enroll on {featuredCourse.provider}
                            </a>
                        </div>
                    </div>
                </section>
            )}
            
            {/* Featured Blog Post */}
            {featuredPost && (
                <section className="mt-20 px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-2">Featured Blog of the Week</h2>
                    <p className="text-center text-slate-400 mb-8">Fresh insights from the blog.</p>
                    <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:transform hover:-translate-y-1 border border-slate-700">
                       <div className="p-6">
                            <span className="text-xs font-semibold text-cyan-400">{featuredPost.Category?.name || 'General'}</span>
                            <h3 className="mt-2 text-xl font-bold text-white">{featuredPost.title}</h3>
                            <p className="mt-2 text-slate-400 text-sm">{featuredPost.content.substring(0, 150)}...</p>
                        </div>
                         <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/50">
                            <Link to={`/blog/${featuredPost.id}`} className="font-semibold text-cyan-400 hover:text-cyan-300">Read More &rarr;</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter */}
            <section className="px-4">
                <NewsletterSignup />
            </section>
        </div>
    );
};

export default HomePage;

