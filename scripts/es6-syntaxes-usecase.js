// Imagine HTML:
// <button id="run-demo">Run Demo</button>
// <pre id="output"></pre>

const runButton = document.getElementById("run-demo");
const outputEl = document.getElementById("output");

function logOutput(message) {
  outputEl.textContent += message + "\n";
}

// 1. Fetch users using async/await
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
}

// 2. Main demo: show why we need these JS features
async function runDemo() {
  outputEl.textContent = ""; // clear previous

  logOutput("=== FETCHING USERS FROM API ===");

  // Fetch users
  const apiUsers = await fetchUsers();

  // -----------------------------------------
  // SPREAD: make a safe copy + add a new user
  // -----------------------------------------
  // Imagine we got a new user from a form:
  const newUserFromForm = {
    id: 999,
    name: "New Student User",
    username: "student999",
    email: "student999@example.com",
    address: {
      city: "Jakarta",
      street: "Jl. Belajar",
    },
    company: {
      name: "RevoU",
    },
    isActive: true,
  };

  // Spread on arrays: add new user to the list
  const allUsers = [...apiUsers, newUserFromForm];

  logOutput(`Total users after adding new one (spread): ${allUsers.length}`);

  // -----------------------------------------
  // MAP + SPREAD: normalize user objects
  // (real use case: cleaning API data)
  // -----------------------------------------
  // Some APIs are messy. We can map them into a clean shape.
  const normalizedUsers = allUsers.map((user) => {
    // Destructuring with renaming + nested fields
    const {
      id,
      name,
      email,
      username,
      address: { city = "Unknown City" } = {},
      company: { name: companyName = "No Company" } = {},
      // maybe the API doesn't have isActive, so default to true:
      isActive = true,
      ...rest // REST: any extra fields we don't care about now
    } = user;

    // Return a "clean" object. Using spread to keep extra fields if needed.
    return {
      id,
      name,
      email,
      username,
      city,
      companyName,
      isActive,
      ...rest, // keep anything else, just in case
    };
  });
  logOutput("Original user:");
  logOutput(JSON.stringify(allUsers[0], null, 2));
  logOutput("Normalized first user (destructuring + spread):");
  logOutput(JSON.stringify(normalizedUsers[0], null, 2));

  // -----------------------------------------
  // FILTER: active users only
  // (real use: showing only active accounts)
  // -----------------------------------------
  const activeUsers = normalizedUsers.filter((user) => user.isActive);

  logOutput(`Active users (filter): ${activeUsers.length}`);

  // -----------------------------------------
  // MAP + TEMPLATE LITERALS + DESTRUCTURING
  // (real use: preparing strings for UI)
  // -----------------------------------------
  const userDisplayLines = activeUsers.map((user) => {
    // Destructure inside the parameter
    const { name, email, city, companyName } = user;

    // Template literal to format for UI
    return `👤 ${name} (${email}) – ${city} | ${companyName}`;
  });

  logOutput("\n=== USERS DISPLAY (map + template literals) ===");
  userDisplayLines.forEach((line) => logOutput(line));

  // -----------------------------------------
  // REDUCE: compute stats
  // (real use: dashboard metrics)
  // -----------------------------------------

  // 1) Count how many users per city
  const usersPerCity = activeUsers.reduce((acc, user) => {
    const { city } = user;
    if (!acc[city]) {
      acc[city] = 0;
    }
    acc[city] += 1;
    return acc;
  }, {});

  logOutput("\n=== USERS PER CITY (reduce) ===");
  Object.entries(usersPerCity).forEach(([city, count]) => {
    logOutput(`${city}: ${count} user(s)`);
  });

  // 2) Total characters of all active usernames (silly but illustrative)
  const totalUsernameChars = activeUsers.reduce(
    (sum, user) => sum + user.username.length,
    0
  );

  logOutput(
    `\nTotal length of all active usernames (reduce): ${totalUsernameChars}`
  );

  // -----------------------------------------
  // ARRAY DESTRUCTURING + REST: pick top users
  // (real use: show "Top user" and "Other users")
  // -----------------------------------------
  // Let's pretend "top" = first three after sorting by name

  const sortedByName = [...activeUsers].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [topUser, secondUser, thirdUser, ...otherUsers] = sortedByName;

  logOutput("\n=== TOP 3 USERS (array destructuring + rest) ===");

  // function with REST parameters: receive one main user, and the rest
  function describeTopUsers(mainUser, ...restUsers) {
    const { name, email } = mainUser;
    logOutput(`⭐ Main top user: ${name} (${email})`);

    if (restUsers.length > 0) {
      logOutput("Other top users:");
      restUsers.forEach(({ name, email }) => {
        logOutput(`- ${name} (${email})`);
      });
    }
  }

  describeTopUsers(topUser, secondUser, thirdUser);

  logOutput(`\nOther users count (rest array): ${otherUsers.length}`);
}

runButton.addEventListener("click", () => {
  runDemo().catch((error) => {
    outputEl.textContent = "Error in demo: " + error.message;
  });
});
