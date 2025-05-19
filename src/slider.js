const slider1 = document.getElementById("sliderImage");
const textUnderSlider = document.getElementById("text");
const buttonDiv1 = document.getElementById("button1");
const buttonDiv2 = document.getElementById("button2");
const buttonDiv3 = document.getElementById("button3");
const buttonNext = document.getElementById("sliderButton");

//اونایی که بخوان تغییر کنن رو ارایه ای از ابجکتها میگیرم عکس و متن
const slides = [
  {
    image: "/public/assets/WallpaperDog-20534536 1.png",
    text: "We provide high quality products just for you",
  },
  {
    image: "public/assets/WallpaperDog-20397673 1.png",
    text: "Your satisfaction is our number one periority",
  },
  {
    image: "public/assets/WallpaperDog-20534715 1.png", 
    text: "Let’s fulfill your fashion needs with shoearight now!",
  },
];

const buttonDiv=[buttonDiv1, buttonDiv2, buttonDiv3];

let currentSlide = 0;

function updateSlider(index) {
  const slide = slides[index];
  slider1.src = slide.image;
  textUnderSlider.textContent = slide.text;

  buttonDiv.forEach((btn, i) => {
    btn.classList.toggle("bg-black", i === index);
    btn.classList.toggle("bg-gray-400", i !== index);
  });

  //این واسه اسلاید اخری متن داخل دکمه رو عوض باید کنه
  if (index === slides.length - 1) {
    buttonNext.textContent = "Get Started";
  } else {
    buttonNext.textContent = "Next";
  }
}

buttonNext.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlider(currentSlide);
  } else {
    // اینجا باید بره لاگین
    location.href = "login.html";
  }
});

buttonDiv1.addEventListener("click", () => {
  currentSlide = 0;
  updateSlider(currentSlide);
});
buttonDiv2.addEventListener("click", () => {
  currentSlide = 1;
  updateSlider(currentSlide);
});
buttonDiv3.addEventListener("click", () => {
  currentSlide = 2;
  updateSlider(currentSlide);
});

updateSlider(currentSlide);