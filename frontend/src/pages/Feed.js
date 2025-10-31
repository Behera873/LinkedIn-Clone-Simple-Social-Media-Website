import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Public Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((p) => (
          <div 
            key={p._id} 
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "10px",
              padding: "10px"
            }}
          >
            <h4>{p.userName || "Anonymous"}</h4>
            <p>{p.content}</p> {/* ✅ corrected field */}
            <small>{new Date(p.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;
