  // ===============================
      // Emrys Portfolio — One file JS
      // - Reveal on scroll
      // - Cursor glow
      // - Smooth anchors
      // - mailto form generator
      // - Optional assets auto-fallback
      // ===============================

      // ---- year ----
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // ---- smooth anchors ----
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if (!id || id === "#") return;

          const el = document.querySelector(id);
          if (!el) return;

          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", id);
        });
      });

      // ---- reveal on scroll ----
      const prefersReduced =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const revealEls = Array.from(document.querySelectorAll(".reveal"));

      if (prefersReduced) {
        revealEls.forEach((el) => el.classList.add("on"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("on");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "60px 0px -10px 0px" }
        );

        revealEls.forEach((el) => io.observe(el));
      }

      // ---- cursor glow follow ----
      const glow = document.querySelector(".glow");

      if (!prefersReduced && glow) {
        const set = (x, y) => {
          glow.style.setProperty("--x", x + "px");
          glow.style.setProperty("--y", y + "px");
        };

        // init center
        set(window.innerWidth * 0.45, window.innerHeight * 0.25);

        window.addEventListener(
          "pointermove",
          (e) => {
            set(e.clientX, e.clientY);
          },
          { passive: true }
        );
      }

      // ---- optional assets (photo + logos) ----
      function enableImage(imgEl, fallbackSelector) {
        if (!imgEl) return;

        imgEl.addEventListener("load", () => {
          imgEl.style.display = "block";
          const parent = imgEl.parentElement;
          if (!parent) return;

          const fallback = parent.querySelector(fallbackSelector);
          if (fallback) fallback.style.display = "none";
        });

        imgEl.addEventListener("error", () => {
          imgEl.style.display = "none";
          const parent = imgEl.parentElement;
          if (!parent) return;

          const fallback = parent.querySelector(fallbackSelector);
          if (fallback) fallback.style.display = "block";
        });
      }

      enableImage(document.getElementById("avatarImg"), "svg.fallback");
      enableImage(document.getElementById("logoKabsImg"), "svg");
      enableImage(document.getElementById("logoIpssiImg"), "svg");

      // ---- mailto form ----
      const form = document.getElementById("contactForm");

      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const name = document.getElementById("fName").value.trim();
          const email = document.getElementById("fEmail").value.trim();
          const subject = document.getElementById("fSubject").value.trim();
          const msg = document.getElementById("fMsg").value.trim();

          const intro = name ? `Bonjour, ici ${name}.` : "Bonjour,";
          const reply = email ? `\n\nMon email : ${email}` : "";
          const signature = "\n\n—\nEnvoyé via le portfolio d’Emrys AGBOTON";

          const body = encodeURIComponent(`${intro}\n\n${msg}${reply}${signature}`);
          const mailSubject = encodeURIComponent(subject || "Prise de contact — Alternance SysAdmin / SecOps");

          window.location.href = `mailto:emrysagboton@gmail.com?subject=${mailSubject}&body=${body}`;
        });
      }
