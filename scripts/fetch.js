const loadBtn = document.getElementById("load-posts");
const statusEl = document.getElementById("status");
const postsEl = document.getElementById("posts");

const displayPosts = (data) => {
  data.forEach((post) => {
    const li = document.createElement("li");
    const body = document.createElement("p");
    body.textContent = post.body;
    li.textContent = post.title;
    postsEl.appendChild(li);
    postsEl.appendChild(body);
  });
};

function someFunction() {
  console.log("1. Starting fetch");
  console.log("2. Got response (not yet JSON)");
  console.log("3. Parsed JSON");
}

async function loadPosts() {
  statusEl.textContent = "Loading posts...";
  postsEl.innerHTML = "";

  try {
    console.log("1. Starting fetch");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    console.log("2. Got response (not yet JSON)");

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error();
    }
    console.log("3. Parsed JSON");
    statusEl.textContent = "Done!";
    displayPosts(data);
  } catch (error) {
    //Error state
    console.error("Error while loading posts:", error);
    statusEl.textContent = "Error loading posts. Please try again.";
  }
}

loadBtn.addEventListener("click", () => {
  console.log("0. Button clicked");
  loadPosts();
  console.log("4. loadPosts called (we continue immediately)");
});
