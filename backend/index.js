const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/user_tracking");

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  accessedAt: { type: Date, default: Date.now },
  scrolledToImage: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.send(user);
});

app.get("/api/report", async (req, res) => {
  const users = await User.find();
  const totalUsers = users.length;
  const scrolledUsers = users.filter((user) => user.scrolledToImage).length;
  res.send({
    totalUsers,
    scrolledUsers,
    scrolledPercentage: (scrolledUsers / totalUsers) * 100,
  });
});

app.listen(5100, () => {
  console.log("Server is running on port 5100");
});
