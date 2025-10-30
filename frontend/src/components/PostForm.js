import React, { useState } from 'react';

export default function PostForm({ onCreate }) {
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onCreate({ text, image: imageData });
    setText('');
    setImageData('');
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={submit} className="card post-form">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write something..." />
      <div className="row">
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button className="btn" type="submit">Post</button>
      </div>
      {imageData && <img src={imageData} alt="preview" style={{maxWidth:200, marginTop:8}} />}
    </form>
  );
}
