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

/*==================== Menu toggle - Active states ====================*/

const toggleMenu = document.querySelector(".icon-menu");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav-list");
const navListLinks = Array.from(document.querySelectorAll(".nav-list__link"));
const loginContainer = document.querySelector(".login-container");
const loginText = document.querySelector(".header__login");

toggleMenu.addEventListener("click", () => {
  toggleMenu.classList.toggle("active");
  nav.classList.toggle("active");
  navList.classList.toggle("active");
  loginContainer.classList.toggle("active");
  loginText.classList.toggle("active");

  navListLinks.forEach((navLink) => {
    navLink.classList.toggle("active");
  });
});

/*==================== Scroll Effects ====================*/

const scrollOffset = 100;

let scrollElement = document.querySelector(".scroll-element");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const displayScrollElement = () => {
  scrollElement.classList.add("scrolled");
};

const hideScrollElement = () => {
  scrollElement.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  if (elementInView(scrollElement, scrollOffset)) {
    displayScrollElement();
  } else {
    hideScrollElement();
  }
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});
