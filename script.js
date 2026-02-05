// ===== DROPDOWN MENU =====
function openMenu() {
  document.querySelector(".dropdown").classList.add("active");
}

function closeMenu() {
  document.querySelector(".dropdown").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown .links a").forEach(a => {
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
    "an IT Student"
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
        setTimeout(() => (isDeleting = true), 1600);

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
