/*==================== Dark Mode ====================*/

let darkMode = localStorage.getItem("darkMode");
const banner = document.querySelector(".header-banner__img");
const themeSwitcher = document.querySelector(".theme-switcher");
const logo = document.querySelector(".logo-container");
const icons = Array.from(document.querySelectorAll(".static-icon-container"));

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disabledDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
  themeSwitcher.classList.toggle("active");

  logo.classList.toggle("active");
  banner.classList.toggle("active");

  icons.forEach((icon) => {
    icon.classList.toggle("active");
  });
}

themeSwitcher.addEventListener("click", () => {
  themeSwitcher.classList.toggle("active");

  logo.classList.toggle("active");
  banner.classList.toggle("active");
  icons.forEach((icon) => {
    icon.classList.toggle("active");
  });

  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disabledDarkMode();
  }
});
