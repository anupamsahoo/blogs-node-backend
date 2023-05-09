const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("BlogPost Model", () => {
  let token;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    // login
    const loginRes = await api
      .post("/api/login")
      .send({ username: "anupammithu", password: "anupam1234" });
    token = loginRes.body.token;
    //console.log("Response: ", loginRes);
  });
  test("returns the correct amount of blog posts", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("verifies that the unique identifier property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("creating a new blog post should increase the total number of blogs by one", async () => {
    const newBlog = {
      title: "My new blog post",
      content:
        "Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.",
      author: "Mithu",
      blog_url: "https://fullstackopen.com/en/part4/testing_the_backend",
      likes: 100,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("default likes to 0 if missing", async () => {
    const newblog = {
      title:
        "Use this page to build a GAQL query that selects fields from the campaign resource. ",
      content:
        "Use this page to build a GAQL query that selects fields from the campaign resource. The list below includes all of the resources, fields, segments, and metrics that are selectable when campaign is the resource in the FROM clause of your GAQL query. The list below will update dynamically based on your selections.",
      author: "Lisha",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newblog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedPost = await Blog.findById(response.body.id);
    expect(savedPost.likes).toBe(0);
  });

  test("if title is missing", async () => {
    const newBlog = {
      content:
        "Use this page to build a GAQL query that selects fields from the campaign resource. The list below includes all of the resources, fields, segments, and metrics that are selectable when campaign is the resource in the FROM clause of your GAQL query. The list below will update dynamically based on your selections.",
      blog_url: "https://example.com/blog-post",
      author: "Example Author",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(400);
  });

  test("if blog_url is missing", async () => {
    const newBlog = {
      title:
        "Use this page to build a GAQL query that selects fields from the campaign resource.",
      content:
        "Use this page to build a GAQL query that selects fields from the campaign resource. The list below includes all of the resources, fields, segments, and metrics that are selectable when campaign is the resource in the FROM clause of your GAQL query. The list below will update dynamically based on your selections.",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);
    expect(response.status).toBe(400);
  });

  test("delete blog if id available", async () => {
    const blogssAtStart = await helper.blogsInDb();
    const blogToDelete = blogssAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });

  describe("when there is initially one user in db", () => {
    beforeEach(async () => {
      //await User.deleteMany({});

      const passwordHash = await bcrypt.hash("anupam1234", 10);
      const user = new User({
        username: "anupammithu",
        name: "Anupam Sahoo",
        passwordHash,
      });

      await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "sujata",
        name: "sujata",
        password: "anupam1234",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });
    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "anupammithu",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
