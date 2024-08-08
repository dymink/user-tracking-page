const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/user_tracking")
  .then(() => console.log("Connected to mongoDB!"));

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndUpdate({ userId: userId }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
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

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
