// CreatePost.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image_url: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert post data into Supabase
    const { data, error } = await supabase.from('posts').insert([
      {
        title: formData.title,
        content: formData.content,
        image_url: formData.image_url,
      },
    ]);

    if (error) {
      console.error('Error inserting post:', error.message);
      alert('Failed to create post!');
    } else {
      console.log('Post created:', data);
      alert('Post created successfully!');
      navigate('/'); // Redirect to the home page or wherever
    }
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
          name="image_url"  // Fixed the name here to match the state key
          placeholder="Image URL (Optional)"
          value={formData.image_url}  // Match this with the state key as well
          onChange={handleChange}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;