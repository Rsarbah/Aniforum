import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';


function Home({ posts = [], deletePost, searchQuery }) { // Default empty array for posts
  const [sortBy, setSortBy] = useState('created_at'); // Sort by created date

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort posts based on the selected criteria
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'created_at') {
      return new Date(b.created_at) - new Date(a.created_at); // Sort by date
    } else {
      return b.upvotes - a.upvotes; // Sort by upvotes
    }
  });

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
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <div key={post.id} className="post-card">
              <Link to={`/post/${post.id}`} className="post-link">
                <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
                <h2>{post.title}</h2>
                {post.image_url && <img src={post.image_url} alt="Post visual" />}
                <p className="post-content">{post.content}</p>
                <p>Upvotes: {post.upvotes}</p>
              </Link>
              <div className="post-actions">
                <button onClick={() => deletePost(post.id)}>Delete</button>
                <Link to={`/update-post/${post.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div> 
    </div>
  );
}

export default Home;
