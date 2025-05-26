
import { getSneakerBrands, getsneakerInfo } from "../api/sneaker";
import { getUserInfo } from "../api/user";
import { tokenName } from "../lib/constant";


      
if (!localStorage.getItem(tokenName)) {
    location.href = "/login";
  }


const homeUserName=document.getElementById('home-username');
//////////////////////////////
const greetingBtn=document.getElementById('greeting-btn');
//////////////////////////

///////////////////////////////








  async function init() {
    try{
        const info=await getUserInfo();
        console.log(info);
        homeUserName.innerText=info.username;
    }
    catch(error){
        console.log(error);
        if (error.response?.status === 403) {
            localStorage.removeItem(tokenName);
            location.href = "/login"; 
          }
        
        
    }
    
  }

  init();

  //////////////////////////////////////////////////////

  function getGreetingMessage() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour >= 5 && hour < 12) {
      return "Good Morning 👋";
    } else if (hour >= 12 && hour < 14) {
      return "Good Noon 👋";
    } else if (hour >= 14 && hour < 19) {
      return "Good Evening 👋";
    } else {
      return "Good night 👋";
    }
  }

  greetingBtn.innerText=getGreetingMessage();


  ///////////////////////////////////////////////////////

  


let currentPage = 1;
let totalPages = 1;
let currentBrand = null;
let isLoading = false;

const brandItem = document.getElementById("brands"); 
const sneakerList = document.getElementById("sneaker-list");

async function addBrand() {
  try {
    const sneakerBrands = await getSneakerBrands();

    let html = `
      <div class="all-button flex items-center justify-center border-2 border-gray-800 rounded-full px-5 font-semibold cursor-pointer bg-gray-800 text-white">
        <p class=" text-base">All</p>
      </div>
    `;

    sneakerBrands.forEach((item) => {
      html += `
        <div data-brand="${item}" class="brand-button flex items-center justify-center border-2 border-gray-800 rounded-full px-5 font-semibold cursor-pointer">
          <p class="text-gray-900 text-base">${item}</p>
        </div>`;
    });

    brandItem.innerHTML = html;

 
    const allBtn = brandItem.querySelector(".all-button");
    allBtn.addEventListener("click", () => {
      currentPage = 1;
      currentBrand = null;
      loadSneakersByBrand();
      highlightSelected(allBtn);
    });


    const buttons = document.querySelectorAll(".brand-button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const brand = btn.dataset.brand;
        currentPage = 1;
        currentBrand = brand;
        loadSneakersByBrand();
        highlightSelected(btn);
      });
    });

  } catch (error) {
    console.error("Error loading brands:", error);
  }
}

async function loadSneakersByBrand(brand = currentBrand, page = currentPage) {

  isLoading = true;
 
    try {
        const response = await getsneakerInfo(page, 10, brand ? [brand] : []);
        const sneakers = response.data;
        totalPages = response.totalPages;
    
        if (page === 1) sneakerList.innerHTML = "";
    
        sneakers.forEach((shoe) => {
          sneakerList.innerHTML += `
            <div data-id="${shoe.id}" class="p-4 rounded-2xl list-shoe-item">
              <img src="${shoe.imageURL}" alt="${shoe.name}" class="w-full h-40 object-cover rounded-2xl" />
              <p class="mt-2 font-bold">${shoe.name}</p>
             
              <p class="text-base">$${shoe.price}</p>
            </div>
          `;
        });

        
    
      } catch (err) {
        console.error("Error loading sneakers by brand:", err);
      } finally {
        isLoading = false;
      }

}

sneakerList.addEventListener("click", (e) => {
    const item = e.target.closest(".list-shoe-item");
    if (item) {
      const id = item.dataset.id;
    
      location.href = `/discription.html?id=${id}`;
    }
  });

function highlightSelected(activeBtn) {
    const allBtns = document.querySelectorAll(".brand-button, .all-button");
  
    allBtns.forEach((btn) => {
      btn.classList.remove("bg-gray-800");
      const text = btn.querySelector("p");
      if (text) {
        text.classList.remove("text-white");
        text.classList.add("text-gray-900");
      }
    });
  
    activeBtn.classList.add("bg-gray-800");
    const activeText = activeBtn.querySelector("p");
    if (activeText) {
      activeText.classList.remove("text-gray-900");
      activeText.classList.add("text-white");
    }
  }

  window.addEventListener("scroll", () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  
    if (nearBottom && !isLoading && currentPage < totalPages) {
      currentPage++;
      loadSneakersByBrand(currentBrand, currentPage);
    }
  });


addBrand();
loadSneakersByBrand();




  ///////////////////////////////////////////////////////////////////
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
 
        navLinks.forEach(l => l.classList.remove('text-black'));
        navLinks.forEach(l => l.classList.add('text-gray-500'));
  

        link.classList.add('text-black');
        link.classList.remove('text-gray-500');

        const target = link.getAttribute('data-target');
  
    
        if (target) {
          window.location.href = target;
        } else {
 
          e.preventDefault();
        }
      });
    });
  });

  

  