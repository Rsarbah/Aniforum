import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';



function Home({ posts = [], deletePost, searchQuery }) {
  const [sortBy, setSortBy] = useState('created_at');

  // Filter posts based on search query
  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  // Sort posts dynamically using useMemo
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortBy === 'created_at') {
        return new Date(b.created_at) - new Date(a.created_at); // Sort by date
      } else {
        return b.upvotes - a.upvotes; // Sort by upvotes
      }
    });
  }, [filteredPosts, sortBy]);

  return (
    <div>
      <h1>All Posts</h1>

      {/* Sorting options */}
      <div className="sort-buttons">
        <button onClick={() => setSortBy('created_at')}>Sort by Date</button>
        <button onClick={() => setSortBy('upvotes')}>Sort by Upvotes</button>
      </div>

      {/* Display posts */}
      <div className="post-container">
        {sortedPosts.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/post/${post.id}`} className="post-link">
              <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
              <h2>{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <p >Upvotes: {post.upvotes} </p>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;