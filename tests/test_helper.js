const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Exercises 4.8.-4.12",
    content:
      "Warning: If you find yourself using async/await and then methods in the same code, it is almost guaranteed that you are doing something wrong. Use one or the other and don't mix the two.",
    author: "Anupam Sahoo",
    blog_url: "https://fullstackopen.com/en/part4/testing_the_backend",
    likes: 50,
    user: "645a1b67c98a745996431978",
  },
  {
    title: "Refactoring tests",
    content:
      "Our test coverage is currently lacking. Some requests like GET /api/notes/:id and DELETE /api/notes/:id aren't tested when the request is sent with an invalid id. The grouping and organization of tests could also use some improvement, as all tests exist on the same in the test file. The readability of the test would improve if we group related tests with describe blocks.",
    author: "Sujata Sahoo",
    blog_url: "https://fullstackopen.com/en/part4/testing_the_backend",
    likes: 100,
    user: "645a1b67c98a745996431978",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
