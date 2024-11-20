// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CreatePost from './Components/CreatePost';
import PostDetail from './Components/PostDetail'; 
import UpdatePost from './Components/UpdatePost';
import { supabase } from './supabaseClient';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]); // Centralized post state
  const [postToEdit, setPostToEdit] = useState(null); // Tracks the post being edited
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select().order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  // Add a new post to Supabase and update the local state
  const addPost = async (newPost) => {
    const { data, error } = await supabase.from('posts').insert([
      { ...newPost, created_at: new Date().toISOString(), upvotes: 0 },
    ]);

    if (error) {
      console.error('Error adding post:', error.message);
    } else if (data && data.length > 0) {
      setPosts((prevPosts) => [data[0], ...prevPosts]); // Update state with the new post
    }
  };

  // Delete a post from Supabase and update the local state
  const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting post:', error.message);
    } else {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  // Update an existing post in Supabase and update the local state
  const updatePost = async (updatedPost) => {
    const { data, error } = await supabase.from('posts').update(updatedPost).eq('id', updatedPost.id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else if (data && data.length > 0) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updatedPost.id ? data[0] : post))
      );
      setPostToEdit(null); // Clear the edit state
    }
  };

  return (
    <Router>
  <Navbar setSearchQuery={setSearchQuery} />
  <Routes>
    <Route
      path="/"
      element={
        <Home
          posts={posts}
          searchQuery={searchQuery}
          deletePost={deletePost}
        />
      }
    />
    <Route path="/create" element={<CreatePost addPost={addPost} />} />
    <Route
      path="/post/:id"
      element={<PostDetail deletePost={deletePost} />}
    />
    <Route
      path="/update-post/:id"
      element={<UpdatePost updatePost={updatePost} />}
    />
  </Routes>
</Router>
    
        
  );
}

 export default App;