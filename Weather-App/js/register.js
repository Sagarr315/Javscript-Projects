document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !phone || !password) {
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const user = { name, email, phone, password };
    localStorage.setItem("weatherUser", JSON.stringify(user));
    alert("Registration successfull Done!");
    window.location.href = "login.html";
  });
