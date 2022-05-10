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

/*==================== Url Shortening ====================*/

const shortlyInput = document.querySelector(".url-input");
const shortlyBtn = document.querySelector(".url-submit__btn");
const shortlyResult = document.querySelector(".hidden-result");
const parentNode = document.querySelector(".shortened-link-container");
const insertedLink = document.querySelector(".long-link__text");
const shortCode = document.querySelector(".link-shortened__text");
const errorMsg = document.querySelector(".error-msg");

// URL Validiation

function urlValidation(defaultUrl) {
  const urlRule =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (defaultUrl.match(urlRule)) {
    return true;
  } else {
    return false;
  }
}

// URL Submission Click Event

const apiFunc = shortlyBtn.addEventListener("click", function () {
  let inputValue = shortlyInput.value;

  // URL Validation

  if (!urlValidation(inputValue)) {
    errorMsg.classList.add("shown");
    shortlyInput.classList.add("shown");
    errorMsg.innerHTML = "Please enter a link";
  } else {
    errorMsg.classList.remove("shown");
    errorMsg.classList.add("hidden");
    shortlyInput.classList.remove("shown");

    // Passed Validation - init API

    fetch(`https://api.shrtco.de/v2/shorten?url=` + inputValue)
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          let shortlyCode = response.result.code;
          // Started Cloning
          let mainClone = shortlyResult.cloneNode(true);
          // mainClone.classList = "search-result";
          mainClone.classList.replace("hidden-result", "search-result");

          //Finished Cloning

          //Storage
          sessionStorage.setItem("cloneCache", parentNode.innerHTML);

          //Target clone child elements

          let cloneLink = mainClone.querySelector(".long-link__text");

          let cloneResultLink = mainClone.querySelector(
            ".link-shortened__text"
          );
          let cloneCopyBtn = mainClone.querySelector(".copy-button");

          //Storage

          sessionStorage.setItem("cloneCopyBtn", cloneCopyBtn.outerHTML);

          //Inserting value of search input

          cloneLink.textContent = `${inputValue}`;

          //Storage

          sessionStorage.setItem("cloneLink", cloneLink.textContent);

          //Inserting the result value

          cloneResultLink.textContent = `shrtco.de/${shortlyCode}`;

          //Storage

          sessionStorage.setItem(
            "cloneResultLink",
            cloneResultLink.textContent
          );

          parentNode.appendChild(mainClone);

          //Link Copy Event

          cloneCopyBtn.addEventListener("click", function (e) {
            e.preventDefault();
            //Target text

            let textToCopy = cloneResultLink.textContent;
            //  Copy Text

            navigator.clipboard.writeText(textToCopy);

            //Change CSS

            cloneCopyBtn.textContent = "Copied!";
            cloneCopyBtn.style.backgroundColor = "var(--DarkViolet)";
            setTimeout(function () {
              cloneCopyBtn.textContent = "Copy";
              cloneCopyBtn.style.backgroundColor = "var(--Cyan)";
            }, 1000);
          });
        } else {
          console.log("error");
        }
      });
  }
});

// Reload function

window.onload = () => {
  let mainClone = shortlyResult.cloneNode(true);
  mainClone.classList.replace("hidden-result", "search-result");
  let cloneLinkField = mainClone.querySelector(".long-link__text");
  let cloneResultLink = mainClone.querySelector(".link-shortened__text");

  //Retrieving

  let originalHtml = sessionStorage.getItem("cloneCache");
  let cloneLink = sessionStorage.getItem("cloneLink");
  let cloneResultLinks = sessionStorage.getItem("cloneResultLink");

  //Injecting

  cloneLinkField.innerHTML = cloneLink;
  cloneResultLink.textContent = cloneResultLinks;
  parentNode.appendChild(mainClone);
  parentNode.innerHTML = originalHtml;

  //Repeating Copy Event

  let cloneCopyBtn = mainClone.querySelector(".copy-button");

  cloneCopyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //Target text
    let textToCopy = cloneResultLink.textContent;
    //  Copy Text
    navigator.clipboard.writeText(textToCopy);
    //Change CSS
    cloneCopyBtn.textContent = "Copied!";
    cloneCopyBtn.style.backgroundColor = "var(--DarkViolet)";
    setTimeout(function () {
      cloneCopyBtn.textContent = "Copy";
      cloneCopyBtn.style.backgroundColor = "var(--Cyan)";
    }, 1000);
  });
};
