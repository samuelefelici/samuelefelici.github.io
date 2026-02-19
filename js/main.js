(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close menu on click link (mobile)
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (menu.classList.contains("open")) {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Scroll spy
  const links = Array.from(document.querySelectorAll(".nav__menu a"));
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(sec => observer.observe(sec));

  // Back to top
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const show = window.scrollY > 600;
    if (toTop) toTop.classList.toggle("show", show);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Contact form -> mailto
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome")?.value?.trim() || "";
      const azienda = document.getElementById("azienda")?.value?.trim() || "";
      const messaggio = document.getElementById("messaggio")?.value?.trim() || "";

      const subject = encodeURIComponent("Richiesta - Analisi dati operativa");
      const body = encodeURIComponent(
        `Ciao Samuele,\n\n` +
        `Mi chiamo ${nome}${azienda ? " (" + azienda + ")" : ""}.\n\n` +
        `${messaggio}\n\n` +
        `Dati disponibili: Excel / DB / Altro\n` +
        `Tempistiche desiderate: \n` +
        `Budget indicativo: \n\n` +
        `Grazie,\n${nome}`
      );

      window.location.href = `mailto:samuele.felici@hotmail.it?subject=${subject}&body=${body}`;
    });
  }
})();
