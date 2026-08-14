// main.js — safe DOM-ready script for the site
document.addEventListener("DOMContentLoaded", () => {
  // ---- Sticky nav shadow ----
  const nav = document.getElementById("siteNav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    });
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- About page interactions ----
  const interestItems = document.querySelectorAll(".interest-item");
  if (interestItems.length) {
    interestItems.forEach((item) => {
      item.addEventListener("click", () => {
        const isActive = item.classList.toggle("active");
        interestItems.forEach((other) => {
          if (other !== item) other.classList.remove("active");
        });
        if (!isActive) item.classList.remove("active");
      });
    });
  }

  const skillItems = document.querySelectorAll(".skill-item");
  if (skillItems.length) {
    skillItems.forEach((item) => {
      const row = item.querySelector(".skill-row");
      if (!row) return;
      row.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        skillItems.forEach((other) => {
          other.classList.remove("open");
          const toggle = other.querySelector(".skill-row");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          row.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ---- Tools ticker ----
  const tools = [
    "Figma",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "VS Code",
    "Lightroom",
    "HTML",
    "CSS",
    "Vanilla JavaScript",
  ];
  const track = document.getElementById("toolsTrack");
  const buildTrack = () => {
    if (!track) return;
    track.innerHTML = "";
    for (let rep = 0; rep < 2; rep++) {
      tools.forEach((t, i) => {
        const span = document.createElement("span");
        span.textContent = t;
        track.appendChild(span);
        if (!(rep === 1 && i === tools.length - 1)) {
          const sep = document.createElement("span");
          sep.className = "sep";
          sep.textContent = "·";
          track.appendChild(sep);
        }
      });
    }
  };
  buildTrack();

  // ---- Projects carousel ----
  const projects = [
    {
      num: "01",
      title: "Lumina<br>Audio",
      tag: "Fiktiv webshop",
      desc: "Et redesign af en fiktiv webshop, hvor jeg har arbejdet med visuelt hierarki, interaktion og responsivt design.",
      img: "img/laptop.png",
      alt: "Skærmbillede af Lumina Audio webshop",
      link: "lumina-audio.html",
    },
    {
      num: "02",
      title: "Fysio<br>Danmark",
      tag: "Optimering af hjemmeside",
      desc: "Analyse og optimering af en eksisterende hjemmeside for en fysioterapiklinik med fokus på brugervenlighed, struktur og en tydeligere vej til booking.",
      img: "img/fysioefter.png",
      alt: "Skærmbillede af Fysio Danmark hjemmeside",
      link: "fysio-danmark.html",
    },
    {
      num: "03",
      title: "Creative<br>Craft",
      tag: "Plakatserie",
      desc: "En serie af collage-plakater, hvor jeg har arbejdet med visuel historiefortælling gennem klip, komposition og farve.",
      img: "img/Group 2.png",
      alt: "To plakater fra projektet Creative Craft",
      link: "creative-craft.html",
    },
  ];

  let current = 0;
  const elNum = document.getElementById("projNum");
  const elTitle = document.getElementById("projTitle");
  const elTag = document.getElementById("projTag");
  const elDesc = document.getElementById("projDesc");
  const elImg = document.getElementById("projImg");
  const elLink = document.getElementById("projLink");
  const dotsWrap = document.getElementById("dots");

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    projects.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i === current ? " active" : "");
      d.setAttribute("aria-label", "Vis projekt " + (i + 1));
      d.addEventListener("click", () => {
        current = i;
        render();
      });
      dotsWrap.appendChild(d);
    });
  }

  function render() {
    const p = projects[current];
    if (elNum) elNum.textContent = p.num;
    if (elTitle) elTitle.innerHTML = p.title;
    if (elTag) elTag.textContent = p.tag;
    if (elDesc) elDesc.textContent = p.desc;
    if (elImg) {
      elImg.src = p.img;
      elImg.alt = p.alt;
    }
    if (elLink) elLink.href = p.link;
    if (dotsWrap)
      [...dotsWrap.children].forEach((d, i) =>
        d.classList.toggle("active", i === current),
      );
  }

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + projects.length) % projects.length;
      render();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      current = (current + 1) % projects.length;
      render();
    });

  buildDots();
  render();
});
