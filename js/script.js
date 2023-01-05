//copyright year auto update
// const copyrightYear = document.querySelector(".copyright-year");
// const currentYear = new Date().getFullYear();
// copyrightYear.textContent = currentYear;

// hamburger menu toggle
const header = document.querySelector(".header");
const hamburgerBtn = document.querySelector(".mobile-navmenu-btn");

hamburgerBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});

//smooth scrolling
const allLinks = document.querySelectorAll("a:link");

//sticky nav
const sectionIntro = document.querySelector(".intro");
const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];

    ent.isIntersecting === false
      ? document.body.classList.add("sticky")
      : document.body.classList.remove("sticky");
  },
  {
    root: null, //this means the element will be observed inside of the viewport.
    threshold: 0,
    rootMargin: "-150px",
  }
);
observer.observe(sectionIntro);

//scroll to
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      header.classList.remove("nav-open");
    }

    if (href !== "#" && href.startsWith("#")) {
      const scrollToLoc = document.querySelector(href);
      scrollToLoc.scrollIntoView({ top: "-8rem", behavior: "smooth" });
      header.classList.remove("nav-open");
    }

    //close hamburger menu
    if (link.classList.contains("header")) {
      header.classList.toggle("nav-open");
    }
  });
});
