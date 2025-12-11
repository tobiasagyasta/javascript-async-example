function getPostsWrong() {
  let result = [];

  fetch("https://jsonplaceholder.typicode.com/posts?_limit=3")
    .then((response) => response.json())
    .then((data) => {
      result = data;
    });
  console.log("Result seharusnya : ", result);
  // Students think: “By now, result has data”
  return result;
}

const posts = getPostsWrong();
console.log("Posts (WRONG):", posts); // []
