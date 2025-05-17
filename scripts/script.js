document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  const modalNext = document.querySelector(".modal-nav.next");
  const modalPrev = document.querySelector(".modal-nav.prev");

  const images = Array.from(document.querySelectorAll(".carousel-img"));
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modal.classList.add("open");
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
  }

  modalNext.addEventListener("click", showNext);
  modalPrev.addEventListener("click", showPrev);

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    modalImg.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modalImg.src = "";
    }
  });

  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.getAttribute("data-fullsrc") || img.src; // data-fullsrc = higher res
  });



  // Arrow key navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") {
      modal.classList.remove("open");
      modalImg.src = "";
    }
  });
});












const images = document.querySelectorAll(".image-carousel img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "block";
  lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Close on click outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

