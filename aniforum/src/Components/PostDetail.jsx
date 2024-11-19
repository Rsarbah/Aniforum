import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select().eq('id', id).single();
      if (error) {
        console.error('Error fetching post:', error.message);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    const { error } = await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', post.id);
    if (!error) setPost({ ...post, upvotes: post.upvotes + 1 });
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const { data, error } = await supabase
        .from('comments')
        .insert({ post_id: post.id, content: newComment });
      if (!error) setComments([...comments, data[0]]);
      setNewComment('');
    }
  };

  return (
    post && (
      <div className="post-detail-container">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {post.image_url && <img src={post.image_url} alt={post.title} />}
        <p>Upvotes: {post.upvotes}</p>
        <button onClick={handleUpvote}>Upvote</button>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    )
  );
}



export default PostDetail;
