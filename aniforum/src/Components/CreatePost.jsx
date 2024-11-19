// CreatePost.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom';


const CreatePost = ({ addPost }) => {
  const [formData, setFormData] = useState({ title: '', content: '', image_url: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(formData); // Add the post to Supabase and App state
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h1>Create a New Post</h1>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post Content (Optional)"
          value={formData.content}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (Optional)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};
export default CreatePost;
  