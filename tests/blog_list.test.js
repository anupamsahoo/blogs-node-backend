const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Robert C. Martin",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  //console.log(result);
  expect(result).toBe(1);
});

describe("total likes", () => {
  if (blogs.length === 1) {
    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(5);
    });
  } else {
    const sumOfLikes = (sum, item) => {
      return sum + item.likes; //array.reduce(reducer, 0)
    };
    test("when list has many blog, sum of total likes", () => {
      const result = listHelper.totalLikes(blogs);
      expect(result).toBe(blogs.reduce(sumOfLikes, 0));
    });
  }
});

const favBlog = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0,
};
test("Favorite Blog", () => {
  const result = listHelper.favoriteBlog(blogs);
  expect(result).toEqual(JSON.stringify(favBlog));
});
const mostBlogsByAuthor = {
  author: "Robert C. Martin",
  blogs: 4,
};
test("Most Blog by author", () => {
  const result = listHelper.mostBlogs(blogs);
  expect(result).toEqual(JSON.stringify(mostBlogsByAuthor));
});
const mostLikesByAuthor = {
  author: "Robert C. Martin",
  likes: 17,
};
test("Most Likes by author", () => {
  const result = listHelper.mostLikes(blogs);
  expect(result).toEqual(JSON.stringify(mostLikesByAuthor));
});
