import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const UpdatePost = ({ postToEdit, updatePost }) => {
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (postToEdit) {
      setFormData(postToEdit); // Pre-fill form with post data
    }
  }, [postToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(formData); // Calls the updatePost function passed from App.jsx
    navigate('/'); // Redirect to Home
  };

  if (!postToEdit) {
    return <p>No post selected for editing.</p>;
  }

  return (
    <div className="container">
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};


export default UpdatePost;