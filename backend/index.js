const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
// AUTH: Assuming auth.js is directly inside the 'routes' folder: backend/routes/auth.js
const authRoutes = require('./routes/auth');
// POSTS: Assuming posts.js is directly inside the 'routes' folder: backend/routes/posts.js
const postsRoutes = require('./routes/posts');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Mongo connection error', err);
});
