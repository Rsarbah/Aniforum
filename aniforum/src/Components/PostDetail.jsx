import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link ,useParams, useNavigate } from 'react-router-dom';

const PostDetail = ({ deletePost }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select().eq('id', id).single();
      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        setPost(data);
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

  // Handle upvoting
  const handleUpvote = async () => {
    const updatedUpvotes = post.upvotes + 1;

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: updatedUpvotes })
      .eq('id', id);

    if (error) {
      console.error('Error updating upvotes:', error.message);
    } else {
      setPost((prevPost) => ({ ...prevPost, upvotes: updatedUpvotes }));
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
      setComments((prevComments) => [...prevComments, { content: newComment }]);
      setNewComment('');
    }
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt="Post visual" />}
      <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
      <p>{post.content}</p>
      <p>Upvotes: {post.upvotes}</p>

      {/* Upvote Button */}
      <div>
        <button onClick={handleUpvote}>Upvote</button>
      </div>

      {/* Edit and Delete Actions */}
      <div className="post-actions">
        <Link to={`/update-post/${post.id}`}>
          <button>Edit Post</button>
        </Link>
        <button onClick={() => deletePost(post.id)}>Delete Post</button>
      </div>

      {/* Comments Section */}
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
        <button onClick={handleAddComment}>Submit Comment</button>
      </div>
    </div>
  );
};

export default PostDetail;