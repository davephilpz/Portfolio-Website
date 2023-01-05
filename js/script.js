const header = document.querySelector(".header");
const hamburgerBtn = document.querySelector(".mobile-navmenu-btn");
hamburgerBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});
const allLinks = document.querySelectorAll("a:link");
const sectionIntro = document.querySelector(".intro");
const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    ent.isIntersecting === !1
      ? document.body.classList.add("sticky")
      : document.body.classList.remove("sticky");
  },
  { root: null, threshold: 0, rootMargin: "-220px" }
);
observer.observe(sectionIntro);
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      header.classList.remove("nav-open");
    }
    if (href !== "#" && href.startsWith("#")) {
      const scrollToLoc = document.querySelector(href);
      scrollToLoc.scrollIntoView({ top: "-8rem", behavior: "smooth" });
      header.classList.remove("nav-open");
    }
    if (link.classList.contains("header")) {
      header.classList.toggle("nav-open");
    }
  });
});
