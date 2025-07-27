document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("dark-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Load saved theme from localStorage
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("bi-moon-stars-fill");
    themeIcon.classList.add("bi-brightness-high-fill");
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Switch icons
    if (isDark) {
      themeIcon.classList.remove("bi-moon-stars-fill");
      themeIcon.classList.add("bi-brightness-high-fill");
    } else {
      themeIcon.classList.remove("bi-brightness-high-fill");
      themeIcon.classList.add("bi-moon-stars-fill");
    }
  });
});
