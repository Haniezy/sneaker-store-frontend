import { getSneakerItem } from "../api/sneaker";



const colorStylesMap = {
  black: "bg-black",
  brown: "bg-amber-600",
  white: "bg-gray-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const descSlider = document.getElementById("desc-slider");
const descInfo = document.getElementById("desc-info");
async function loadItem(id) {
  const response = await getSneakerItem(id);

  descSlider.innerHTML = `
  
  <div class="swiper w-full max-w-4xl h-full rounded-xl overflow-hidden relative">
    <button id="left-back" class="absolute z-10 top-6 left-2"><img src="public/assets/arrow-left-short.svg" alt="back"></button>
    <div class="swiper-wrapper h-full">
   
      ${[...Array(5)]
        .map(
          () => `
        <div class="swiper-slide flex items-center justify-center">
          <img src="${response.imageURL}" alt="shoes" />
        </div>
      `
        )
        .join("")}
    </div>
    <div class="swiper-pagination"></div>
  </div>`;

  const leftBack = document.getElementById("left-back");

  leftBack.addEventListener("click", () => {
    location.href = "/home";
  });

  const swiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 20,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  descInfo.innerHTML = `<div class="mt-5 flex justify-between items-end">
            <p class="text-3xl font-semibold">${
              response.name
            }</p><img src="public/assets/Vector.svg" alt="">
        </div>
        <div class="mt-4 flex items-center">
            <div class="bg-gray-200 h-6 w-20 rounded flex justify-center items-center ">
                <p class="text-xs text-gray-900">5.371 sold</p>
            </div>
            <img class="ml-4" src="public/assets/star_half_30dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="half-star">
            <p class="text-base text-gray-700 ml-1">4.3(5,389 reviews)</p>
        </div>

        <hr class="mt-4">

        <p class="text-xl font-bold mt-3">Description</p>
        <p class="text-base font-medium mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat expedita
            numquam consequatur</p>

        <div class="flex text-right items-end h-10 w-full space-x-40">
            <div>
                <p class="text-xl font-bold ">Size</p>
            </div>
            <div>
                <p class="text-xl font-bold ">Color</p>
            </div>
        </div>

        <div class="flex">
            <div class="flex text-right items-end h-10 w-full mt-2 space-x-2">
              ${response.sizes
                .split("|")
                .map(
                  (size) =>
                    `<div class="w-10 h-10 rounded-full  border-2 border-gray-400 flex items-center justify-center">
                    <p class="text-gray-500">${size}</p>
                </div>`
                )
                .join("")}
                

            </div>

            <div class="flex text-right items-end h-10 w-full mt-2 space-x-2">
            ${response.colors
              .split("|")
              .map(
                (color) =>
                  `<div class="w-10 h-10 rounded-full  ${colorStylesMap[color]} flex items-center justify-center"></div>`
              )
              .join("")}

            </div>
        </div>

        <div class="w-full h-20 flex justify-start items-center">
            <p class="text-lg font-bold mr-4">Quantity</p>
            <div class="w-36 h-12 bg-gray-100 rounded-3xl flex justify-around items-center">
                <img src="public/assets/remove_25dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">

                <p class="text-lg font-semibold">0</p>
                <img src="public/assets/add_25dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="add-icon">

            </div>
        </div>

        <hr class="mt-2">

        <div class="flex items-center w-full h-20 mt-2">
            <div class="mr-10">
                <p class="text-xs font-extralight text-gray-400">Total price</p>
                <p class="text-xl mt-1 font-semibold">$${response.price}</p>
            </div>
            <div class="w-64 h-14 bg-black rounded-full flex justify-center items-center space-x-4">
               <button id="add-to-cart-btn" class="w-64 h-14 bg-black rounded-full flex justify-center items-center space-x-4">
  <img src="public/assets/lock_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="lock">
  <p class="text-lg text-white font-medium">Add to Cart</p>
</button>
            </div>

        </div>`;


        const addToCartBtn = document.getElementById("add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  const product = {
    id: response.id,
    name: response.name,
    price: response.price,
    imageURL: response.imageURL,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));
location.href = "/cart.html";

alert("Product added successfully");
});


}



loadItem(id);




