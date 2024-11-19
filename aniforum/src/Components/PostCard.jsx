// PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => (
  <div className="post-card">
    <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
    <h3>{post.title}</h3>
    <p>{post.upvotes} upvotes</p>
    {post.image_url && (
      <img src={post.image_url} alt="Post" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
    )}
  </div>
);

export default PostCard;
