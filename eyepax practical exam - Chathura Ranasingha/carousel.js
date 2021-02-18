//Initializing required variables for DOM
const track = document.querySelector(".slider__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".slider__button--right");
const preButton = document.querySelector(".slider__button--left");
const navigationDots = document.querySelector(".slider__nav");
const dots = Array.from(navigationDots.children);
const slideWidth = slides[0].getBoundingClientRect().width;

//Toget the Slider position in the caruosel
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";

  targetSlide.classList.add("current-slide");
  currentSlide.classList.remove("current-slide");
};

//Updating navigation dots when slider moving
const updateNavigationDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// This function is to hide left arrow when slider is at first slide and hide right arrow
// when slider is at last slide
const hideShowArrows = (slides, preButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    preButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    preButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    preButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

//Move slide when clicking to navigation dots.
navigationDots.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = navigationDots.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);

  updateNavigationDots(currentDot, targetDot);
  hideShowArrows(slides, preButton, nextButton, targetIndex);
});

//Click event for move to right side
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = navigationDots.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateNavigationDots(currentDot, nextDot);
  hideShowArrows(slides, preButton, nextButton, nextIndex);
});

//Click event for move to left side
preButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = navigationDots.querySelector(".current-slide");
  const preDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateNavigationDots(currentDot, preDot);
  hideShowArrows(slides, preButton, nextButton, prevIndex);
});
