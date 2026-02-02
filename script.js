function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
// Popup for certificates
function showCertificate(src) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
