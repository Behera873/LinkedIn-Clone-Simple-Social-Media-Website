import React, { useState } from 'react';
import api from '../services/api';

export default function CreatePost({ onPosted, user }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      await api.post('/posts', { content, userName: user.name });
      setContent('');
      onPosted();
    } catch (err) {
      alert('Failed to create post');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <textarea rows={3} value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" style={{ width: '100%' }}/>
      <div>
        <button type="submit" disabled={loading || !user}>{loading ? 'Posting...' : 'Post'}</button>
      </div>
    </form>
  );
}
