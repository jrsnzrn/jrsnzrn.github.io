const span = document.querySelector('.typing-text span');

const words = [
  "  CyberSecurity Certified",
  "  Software Developer",
  "  Web Designer",
  "  College Student"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    span.textContent = currentWord.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000); // pause at end
      return;
    }
  } else {
    span.textContent = currentWord.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = isDeleting ? 50 : 150;
  setTimeout(type, speed);
}

type();
