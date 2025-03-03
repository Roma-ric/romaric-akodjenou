import React from 'react';
import SectionTitle from './SectionTitle';

const Blog = () => {
  return (
    <div className="relative min-h-screen py-16 bg-transparent flex flex-col md:flex-row overflow-hidden md:pb-16" id='blog'>

      <SectionTitle
        text={"MY BLOG"}
        percentage={50}
        backgroundText='POSTS'
      />

    </div>
  );
};

export default Blog;