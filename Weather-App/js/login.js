document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const userData = localStorage.getItem("weatherUser");
  console.log("Fetched from localStorage:", userData);

  if (!userData) {
    alert("No user registered.");
    return;
  }

  const user = JSON.parse(userData);

  if (user.email !== email || user.password !== password) {
    alert("Invalid email or password.");
    return;
  }

  alert("Login successful!");
  window.location.href = "dashboard.html";
});
