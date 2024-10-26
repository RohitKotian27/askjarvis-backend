require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(
  cors({
    origin: "https://askjarvis.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

mongoose.connect(
  `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@jarvisusers.w5pi4.mongodb.net/jarvisUsers`
);

app.get("/", (req, res) => {
  res.send("Hello There!!!");
});

app.post("/getchats", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json(user);
    }
  });
});

app.post("/savechats", (req, res) => {
  const { email, chats } = req.body;
  UserModel.findOneAndUpdate(
    { email: email },
    { userChats: chats },
    {
      new: true,
    }
  )
    .then(() => {
      res.json("User Chats have been saved successfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/register", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Email ID already registered or is unavailable.");
    } else {
      UserModel.create(req.body)
        .then(() => res.json("Success"))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const loginResponse = {
          message: "Success",
          userId: user.id,
          userName: user.name,
          email: user.email,
        };
        res.json(loginResponse);
      } else {
        res.json("Incorrect password. Please try again.");
      }
    } else {
      res.json("No record found. Please register to continue.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
