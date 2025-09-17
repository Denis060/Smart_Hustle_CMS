// This file is located at: frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Layout and Page Components
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage'; // Import the new HomePage
// import BlogPage from '../pages/BlogPage';
// import PostPage from '../pages/PostPage';
// import CoursesPage from '../pages/CoursesPage';
// import AboutPage from '../pages/AboutPage';
// import AdminLayout from '../pages/admin/AdminLayout';

// --- Placeholder Page Components ---
// We will replace these with real page files in the next steps.
// const HomePage = () => <h1 className="text-3xl font-bold">Welcome to the Homepage</h1>;
const BlogPage = () => <h1 className="text-3xl font-bold">Blog Posts</h1>;
const PostPage = () => <h1 className="text-3xl font-bold">Single Blog Post</h1>;
const MyCoursesPage = () => <h1 className="text-3xl font-bold">My Courses</h1>;
const RecommendedCoursesPage = () => <h1 className="text-3xl font-bold">Recommended Courses</h1>;
const AboutPage = () => <h1 className="text-3xl font-bold">About Me</h1>;


function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all public-facing routes in the Layout component */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<PostPage />} />
              <Route path="/my-courses" element={<MyCoursesPage />} />
              <Route path="/recommended-courses" element={<RecommendedCoursesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        } />
        
        {/* Admin routes will have their own layout and won't be nested here */}
        {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

