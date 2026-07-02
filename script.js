/* ============================================================
   Team OS - V1 Improvement Plan
   Progressive enhancement only. The document is fully readable
   and printable with JavaScript disabled. No external libraries.
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. Floating "Save as PDF" button (screen only)
     Hidden automatically during print via the .no-print rule.
  ---------------------------------------------------------- */
  function addPrintButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "print-fab no-print";
    btn.setAttribute("aria-label", "Save this document as a PDF");
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
      'stroke-linejoin="round"><path d="M6 9V2h12v7"/>' +
      '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>' +
      '<rect x="6" y="14" width="12" height="8" rx="1"/></svg>' +
      "<span>Save as PDF</span>";
    btn.addEventListener("click", function () {
      window.print();
    });
    document.body.appendChild(btn);
  }

  /* ----------------------------------------------------------
     2. Gentle scroll-reveal for cards and sections.
     Respects reduced-motion and skips entirely when printing.
  ---------------------------------------------------------- */
  function addReveal() {
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var targets = document.querySelectorAll(
      ".init, .snap, .barrier, .risk, .wtable, .gantt, .maturity, .goal-banner, .layer"
    );

    // If motion is reduced or IntersectionObserver is unavailable,
    // leave everything fully visible.
    if (prefersReduced || !("IntersectionObserver" in window)) {
      return;
    }

    targets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach(function (el) {
      io.observe(el);
    });

    // Failsafe: reveal all before printing so nothing prints blank.
    window.addEventListener("beforeprint", function () {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
    });
  }

  /* ----------------------------------------------------------
     Init
  ---------------------------------------------------------- */
  function init() {
    addPrintButton();
    addReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
