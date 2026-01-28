const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require("cors");  
require("dotenv").config();

const userRoutes = require("./routes/User");
const musicRoutes = require("./routes/Music");
const quoteRoutes = require("./routes/Quote");
const diaryRoutes = require("./routes/Diary");

const app = express();
const port = 4000;
app.use(express.json());

app.use(cors(
  /*{origin: "http://localhost:3000",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
  }*/
));  

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ Connected to MongoDB at ${process.env.MONGO_URI}`))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
  app.use(session({
  secret: process.env.SESSION_SECRET,     
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.get('/', (req, res) => {
  res.send('Backend is running!');
});



app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/diaries", diaryRoutes);



app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Backend listening on port ${port}`);
});
