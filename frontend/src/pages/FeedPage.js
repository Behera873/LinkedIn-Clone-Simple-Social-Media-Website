import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CreatePost from './CreatePost';
import PostCard from '../components/PostCard';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to fetch posts');
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div>
      <h2>Feed</h2>
      {user ? <CreatePost onPosted={fetchPosts} user={user} /> : <div>Please login to post</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      <div>
        {posts.map(p => <PostCard key={p._id} post={p} fetchPosts={fetchPosts} user={user} />)}
      </div>
    </div>
  );
}
