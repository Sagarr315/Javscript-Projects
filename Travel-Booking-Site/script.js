// Select all toggle buttons and body
const toggleBtns = document.querySelectorAll(".theme-toggle");
const body = document.body;

// Load theme from localStorage (on page load)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  toggleBtns.forEach((btn) => btn.classList.replace("bx-moon", "bx-sun"));
} else {
  body.classList.remove("dark-mode");
  toggleBtns.forEach((btn) => btn.classList.replace("bx-sun", "bx-moon"));
}

// Toggle theme on button click
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtns.forEach((icon) =>
        icon.classList.replace("bx-moon", "bx-sun")
      );
    } else {
      localStorage.setItem("theme", "light");
      toggleBtns.forEach((icon) =>
        icon.classList.replace("bx-sun", "bx-moon")
      );
    }
  });
});
