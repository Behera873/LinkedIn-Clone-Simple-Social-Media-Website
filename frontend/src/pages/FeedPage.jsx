import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CreatePost from './CreatePost'; // The component that submits the post
import PostCard from '../components/PostCard';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      // The backend should return posts sorted by newest first
      const res = await api.get('/posts'); 
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError('Failed to fetch posts. Please ensure the backend is running and you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    // Only fetch if a user is logged in
    if (user) {
        fetchPosts(); 
    } else {
        setLoading(false);
        setPosts([]);
    }
  }, [user]); // Re-fetch when user state changes (login/logout)

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, background: '#f0f2f5' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: 15 }}>Home Feed</h2>
      
      {/* Post Creation Component */}
      {user ? (
        <CreatePost onPosted={fetchPosts} user={user} />
      ) : (
        <div style={{ padding: 15, background: '#fff', border: '1px solid #ddd', borderRadius: 8, textAlign: 'center' }}>
          Please **log in** to share an update.
        </div>
      )}
      
      {/* Error and Loading States */}
      {error && <div style={{ color:'red', padding: 10, border: '1px solid red', background: '#ffebeb', marginBottom: 15, borderRadius: 4 }}>{error}</div>}
      {loading && <div style={{ textAlign: 'center', padding: 10 }}>Loading posts...</div>}
      
      {/* Posts */}
      <div style={{ marginTop: 20 }}>
        {posts.length === 0 && !loading && !error ? (
          <div style={{ textAlign: 'center', padding: 20, background: '#fff', borderRadius: 8 }}>No posts yet.</div>
        ) : (
          posts.map(p => (
            // Pass the logged-in user to PostCard for delete permissions
            <PostCard key={p._id} post={p} fetchPosts={fetchPosts} user={user} />
          ))
        )}
      </div>
    </div>
  );
}
