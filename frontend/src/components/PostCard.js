import React from 'react';
import api from '../services/api';

export default function PostCard({ post, fetchPosts, user }) {
  const onDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${post._id}`);
      fetchPosts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const postUserId = post.user?._id ? post.user._id : post.user;
  const canDelete = user && postUserId && (postUserId.toString() === user.id.toString());

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <div style={{ fontWeight: 'bold' }}>{post.userName}</div>
      <div style={{ color: '#555', fontSize: 12 }}>{new Date(post.createdAt).toLocaleString()}</div>
      <p>{post.content}</p>
      {canDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
}
