const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/user_tracking";

mongoose.connect(mongoUri).then(() => console.log("Connected to mongoDB!"));

app.post("/api/users", async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findOne({ userId });

    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate({ userId }, req.body, { new: true });
    } else {
      // Create new user
      user = new User(req.body);
      await user.save();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
});

app.patch("/api/users/:userId", async (req, res) => {
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
