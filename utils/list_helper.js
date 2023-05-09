const __lodash = require("lodash");

const dummy = (blogs) => {
  if (blogs) return 1;
  return false;
};
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((item) => item.likes);
  const max = Math.max(...likes);
  const f = blogs.find((item) => item.likes === max);
  return JSON.stringify(f);
};

const mostBlogs = (blogs) => {
  const blogCounts = __lodash.countBy(blogs, (item) => item.author);
  const objKey = Object.keys(blogCounts);
  const objValue = Object.values(blogCounts);
  const newArray = objKey.map((item, i) => {
    return { author: item, blogs: objValue[i] };
  });
  const blogsCount = newArray.map((item) => item.blogs);
  const max = Math.max(...blogsCount);
  const f = newArray.find((item) => item.blogs === max);
  return JSON.stringify(f);
};

const mostLikes = (blogs) => {
  const counter = [];
  blogs.map((item) => {
    if (counter[item.author]) {
      counter[item.author] += item.likes;
    } else {
      counter[item.author] = item.likes;
    }
  });
  const objKey = Object.keys(counter);
  const objValue = Object.values(counter);
  const newArray = objKey.map((item, i) => {
    return { author: item, likes: objValue[i] };
  });

  const max = Math.max(...newArray.map((item) => item.likes));
  const f = newArray.find((item) => item.likes === max);
  return JSON.stringify(f);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
