import React from 'react';
import SectionTitle from './SectionTitle';

const Blog = () => {
  return (
    <div className=" bg-black dark:bg-white dark:border-white/[0.2] dark:bg-opacity-5 min-h-screen py-16 bg-transparent flex flex-col overflow-hidden" id='blog'>

      <SectionTitle
        text={"BLOG"}
        percentage={50}
        backgroundText='POSTS'
      />

    </div>
  );
};

export default Blog;