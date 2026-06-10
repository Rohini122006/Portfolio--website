document.addEventListener("DOMContentLoaded", () => {

  const wrapper = document.querySelector(".slides-wrapper");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  const progress = document.querySelector(".progress");

  let index = 0;

  /* ================= DOTS ================= */

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function update() {
    wrapper.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");

    progress.style.width = ((index + 1) / slides.length) * 100 + "%";
  }

  function goToSlide(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  function nextSlide() {
    goToSlide(index + 1);
  }

  function prevSlide() {
    goToSlide(index - 1);
  }

  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);

  /* ================= AUTO PLAY ================= */

  let autoplay = setInterval(nextSlide, 3000);

  const slider = document.querySelector(".project-images.slider");

  slider.addEventListener("mouseenter", () => clearInterval(autoplay));

  slider.addEventListener("mouseleave", () => {
    autoplay = setInterval(nextSlide, 3000);
  });

  /* ================= TOUCH SWIPE (MOBILE) ================= */

  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) nextSlide();
    if (startX < endX - 50) prevSlide();
  });

  /* ================= INIT ================= */

  update();

});