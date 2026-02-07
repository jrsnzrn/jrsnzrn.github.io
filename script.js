// ===== DROPDOWN MENU =====
function openMenu() {
  document.querySelector(".dropdown").classList.add("active");
}

function closeMenu() {
  document.querySelector(".dropdown").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown .links a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
});

// ===== TYPEWRITER ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".typewriter-text");
  if (!textElement) return;

  const words = [
    "a Web Developer",
    "Certified in CyberSecurity",
    "a Programmer",
    "an IT Student",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      textElement.textContent = currentWord.substring(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1600); // pause at end
        return;
      }
    } else {
      charIndex--;
      textElement.textContent = currentWord.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 120);
  }

  typeEffect();
});

// ===== SECTION REVEAL ANIMATIONS (Skills / Certifications / Projects) =====
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(
    ".skills, .projects, .certifications"
  );

  if (!revealSections.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in-view");

        // Fill skill bars when Skills section becomes visible
        if (entry.target.classList.contains("skills")) {
          entry.target.querySelectorAll(".skill-card").forEach((card) => {
            const level = card.getAttribute("data-level") || "0";
            const fill = card.querySelector(".fill");
            if (fill) fill.style.setProperty("--level", level + "%");
          });
        }

        // Animate once
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  revealSections.forEach((section) => revealObserver.observe(section));
});
