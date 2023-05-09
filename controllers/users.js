const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      content: 1,
    });
    if (users.length > 0) {
      response.json(users);
    } else {
      response.status(400).json({ error: "Users not found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    response
      .status(400)
      .json({ error: "Both username and password must be given" });
  }
  if (password.length < 3) {
    response.status(400).json({ error: "Password should be more than 3 char" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
