import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    upvotes: 0, // Added upvotes field
  });

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch the post and comments
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        setFormData({
          title: data.title,
          content: data.content,
          image_url: data.image_url,
          upvotes: data.upvotes || 0, // Ensuring upvotes exist
        });
      }
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id);

      if (error) {
        console.error('Error fetching comments:', error.message);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
    } else {
      alert('Post updated successfully!');
      navigate(`/post/${id}`); // Redirect to the post detail page
    }
  };

  // Handle upvoting
  const handleUpvote = async () => {
    const updatedUpvotes = formData.upvotes + 1;

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: updatedUpvotes })
      .eq('id', id);

    if (error) {
      console.error('Error updating upvotes:', error.message);
    } else {
      setFormData((prev) => ({ ...prev, upvotes: updatedUpvotes }));
    }
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: id, content: newComment }]);

    if (error) {
      console.error('Error adding comment:', error.message);
    } else {
      setComments((prev) => [...prev, { content: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h1>Edit Post</h1>
        
        {/* Post Title */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Post Content */}
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Post Image URL */}
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        {/* Upvote Button */}
        <div>
          <p>Upvotes: {formData.upvotes}</p>
          <button type="button" onClick={handleUpvote}>Upvote</button>
        </div>
        
        {/* Submit Button */}
        <button type="submit">Update Post</button>
      </form>

      {/* Comment Section */}
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
        
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="button" onClick={handleAddComment}>Submit Comment</button>
      </div>
    </div>
  );
};

export default UpdatePost;