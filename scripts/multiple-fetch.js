async function loadPostsAndUsersSequential() {
  console.log("Sequential start");

  const postsResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const posts = await postsResponse.json();

  const usersResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=3"
  );
  const users = await usersResponse.json();

  console.log("Sequential end");
  console.log("Posts:", posts);
  console.log("Users:", users);
}

async function loadPostsAndUsersParallel() {
  console.log("Parallel start");

  const [postsResponse, usersResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=3"),
    fetch("https://jsonplaceholder.typicode.com/users?_limit=3"),
  ]);

  const [posts, users] = await Promise.all([
    postsResponse.json(),
    usersResponse.json(),
  ]);

  console.log("Parallel end");
  console.log("Posts:", posts);
  console.log("Users:", users);
}
