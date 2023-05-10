const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const userExtractor = middleware.userExtractor;

/* const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}; */

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    id: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.title) {
    response.status(400);
  }
  if (!body.blog_url) {
    response.status(400);
  }

  const request_user = request.user;
  const user = await User.findById(request_user);
  const blog = new Blog({
    title: body.title,
    content: body.content,
    author: body.author,
    blog_url: body.blog_url,
    likes: body.likes ? body.likes : 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  if (savedBlog) {
    response.status(201).json(savedBlog);
  } else {
    response.status(404).json({ error: "Something went wrong" });
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;
  const request_user = request.user;

  const user = await User.findById(request_user);
  const blog = await Blog.findById(id);
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "Unauthorized access" });
  }
  const result = await Blog.findByIdAndRemove(id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: `Blog post with ID ${id} not found.` });
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const body = request.body;
  try {
    const id = request.params.id;
    const request_user = request.user;

    const user = await User.findById(request_user);

    const blogToUpdate = {
      title: body.title,
      content: body.content,
      author: body.author,
      blog_url: body.blog_url,
      likes: body.likes ? body.likes : 0,
      user: user.id,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(500).json({ error: "Server error." });
  }
});

blogsRouter.patch("/:id", userExtractor, async (request, response) => {
  const { likes } = request.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: likes,
      },
      { new: true, runValidators: true, context: "query" }
    );
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(500).json({ error: "Server error." });
  }
});

module.exports = blogsRouter;
