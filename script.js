// const slides = document.querySelectorAll(".slides img");/*this selects all elements with this class and puts them in an array */

// let slideIndex=0;
// let intervalId=null;

// //initializeSlider();
// document.addEventListener("DOMContentLoaded", initializeSlider);
// //this function waits for page's content to load then initializes displays.

// console.log(slides);

// function initializeSlider(){

//   if(slides.length>0){
//   slides[slideIndex].classList.add("displaySlide");
//   }
// }

// function showSlide(index){

//   if(index >= slides.length){
//     slideIndex=0;
//   }
//   else if(index<0){
//     slideIndex=slides.length - 1;
//   }

//   slides.forEach(slide => {
//     slide.classList.remove("displaySlide");
//   });
//   slides[slideIndex].classList.add("displaySlide");
// }

// function prevSlide(){
// slideIndex--;
// showSlide(slideIndex);
// }

// function nextSlide(){
//   slideIndex++;
//   showSlide(slideIndex);
// }

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".slides_container");

  containers.forEach((container) => {
    const slides = container.querySelectorAll(".slides img, .slides video");
    let index = 0;

    // Show first slide
    slides[index].classList.add("displaySlide");

    const next = container.querySelector(".next");
    const prev = container.querySelector(".prev");

    next.addEventListener("click", () => {
      slides[index].classList.remove("displaySlide");
      index = (index + 1) % slides.length;
      slides[index].classList.add("displaySlide");
    });

    prev.addEventListener("click", () => {
      slides[index].classList.remove("displaySlide");
      index = (index - 1 + slides.length) % slides.length;
      slides[index].classList.add("displaySlide");
    });
  });
});

/*-------------------- nav menu --------------------- */

const navBar = document.querySelector(".nav_list_2");
const cross = document.querySelector(".fa-xmark");
const bars = document.querySelector(".fa-bars");

function barOut() {
  navBar.style.right = "0px";
}
function barIn() {
  navBar.style.right = "-300px";
}

/*----------------------- scroll navbar effect ------------------- */

const navUpper = document.querySelector("#nav_id");

function scrolled() {
  if (window.scrollY > 50) {
    navUpper.classList.add("nav_scrolled");
  } else {
    navUpper.classList.remove("nav_scrolled");
  }
}

/* ------------------------ type effect on HERO section ----------------------- */

var typed = new Typed(".typing", {
  strings: ["Graphic Designer", "Computer Engineer", "Brand Designer"],
  typeSpeed: 70,
  backSpeed: 70,
  loop: true,
});

/* ------------------------ scroll animation --------------------------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll_animation_show");
      }
    });
  },
  {
    threshold:
      window.innerWidth > 767
        ? 0.5
        : 0.2 /* ------- to delay appearnce when part of sec appears ----- */,
    rootMargin:
      "0px 0px 0px 0px" /* ------- to delay appearnce when part of sec appears ----- */,
  }
); /* -----------1st is a fucntion with "entries var", 2nd is an object, and we made it an empty one cuz it doesnt matter */

const Allsections = document.querySelectorAll(".scroll_animation");
Allsections.forEach((el) =>
  observer.observe(el)
); /* to set an eye on the objects */

/* ---------------- see more button ----------------------- */

const portSection = document.querySelector(".portfolio_section");

const projects = document.querySelectorAll(".proj_child");

const portButton = document.querySelector(".port_button");

var num = 1;

function seeMore() {
  if (num == 1) {
    projects.forEach((proj) => {
      proj.classList.add("proj_child");
      proj.classList.add("proj_child_appear");
      portButton.innerText = "See Less";
      num = num - 1;
    });
  } else {
    projects.forEach((proj) => {
      proj.classList.add("proj_child");
      proj.classList.remove("proj_child_appear");
      portButton.innerText = "See More";
      num = num + 1;
      console.log("we in else state");
      setTimeout(() => {
        portSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 1);
    });
  }
}

/** ----------- projects LIGHTBOX ------------- */

const slidesContainers = document.querySelectorAll(".slides_container");

// Create lightbox once
const lightBox = document.createElement("div");
lightBox.id = "lightbox";
document.body.appendChild(lightBox);

const lightVideo = document.createElement("video");
const lightImage = document.createElement("img");
const cross2 = document.createElement("i");

cross2.classList.add("cross2", "fa-solid", "fa-xmark");

lightBox.appendChild(lightVideo);
lightBox.appendChild(lightImage);
lightBox.appendChild(cross2);

// Loop through each slides container
slidesContainers.forEach((container) => {
  const slides = container.querySelectorAll(".slides");

  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      if (e.target.closest("video")) {
        const vidSource = e.target.src;
        lightVideo.src = vidSource;
        lightBox.style.display = "flex";
      } else {
        const imageSource = e.target.src;
        lightImage.src = imageSource;
        lightBox.style.display = "flex";
        console.log("Lightbox ACTIVE:", imageSource);
      }
    });
  });
});

// Close with X button
cross2.addEventListener("click", () => {
  lightBox.style.display = "none";
  lightVideo.pause();
  lightVideo.src = "";

  lightImage.src = "";
});

// Close by clicking background
lightBox.addEventListener("click", (e) => {
  if (e.target === lightBox) {
    lightBox.style.display = "none";
    lightVideo.pause();
    lightVideo.src = "";

    lightImage.src = "";
  }
});

/** -------- pause logos display when grabbing -------- */

const container = document.querySelector(".worked_with_container");
const groups = document.querySelectorAll(".group");

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Pause animation
function pauseAnimation() {
  groups.forEach((g) => g.classList.add("paused"));
}

// Resume animation
function resumeAnimation() {
  groups.forEach((g) => g.classList.remove("paused"));
}

// MOUSE DOWN (left button only)
container.addEventListener("mousedown", (e) => {
  if (e.button !== 0) return; // left mouse only

  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;

  pauseAnimation();
  container.style.cursor = "grabbing";
});

// MOUSE MOVE (drag)
container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 1.8; // drag sensitivity
  container.scrollLeft = scrollLeft - walk;
});

// RELEASE DRAG — WORKS 100%
window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;
  resumeAnimation();
  container.style.cursor = "grab";
});
