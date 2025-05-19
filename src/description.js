console.log("ok")

const swiper = new Swiper('.swiper', {
  loop: true,
  spaceBetween: 20,
  speed: 600,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});