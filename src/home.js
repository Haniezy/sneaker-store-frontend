
import { getsneakerBrands, getsneakerInfo } from "../api/sneaker";
import { getUserInfo } from "../api/user";
import { tokenName } from "../lib/constant";


      
if (!localStorage.getItem(tokenName)) {
    location.href = "/login";
  }


const homeUserName=document.getElementById('home-username');
//////////////////////////////
const greetingBtn=document.getElementById('greeting-btn');
//////////////////////////
const brandItem=document.getElementById('brands');
///////////////////////////////
const shoseItem=document.getElementById('shoes-item');
let currentPage = 1;
const limit = 10;
let isLoading = false;
let hasMore = true;
/////////////////////////////////////
const homeBtn=document.getElementById("home-btn");
const cartBtn=document.getElementById("cart-btn");




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

  

  async function addBrand() {
    try {
      const sneakerBrands = await getsneakerBrands(); 
  
      let html = ""; 
      sneakerBrands.forEach((item) => {
        html += `
          <div class="flex items-center justify-center border border-2 border-gray-800 rounded-full px-5 font-semibold">
            <p class="text-gray-900 text-base">${item}</p>
          </div>`;
      });
  
      brandItem.innerHTML += html; 
    } catch (error) {
      console.log(error);
    }
  }

  addBrand()



  ////////////////////////////////////////////////////


  async function loadMoreShoes() {
    if (isLoading || !hasMore) return;
    isLoading = true;
  
    try {
      const response = await getsneakerInfo(currentPage, limit);
      const sneakerShoes = response.data;
  
      if (sneakerShoes.length === 0) {
        hasMore = false; // دیگه چیزی نیست
        return;
      }
  
      let html = "";
      sneakerShoes.forEach((shoe) => {
        html += `
          <div class="h-60 ">
            <div class="h-[182px] w-[182px] rounded-3xl bg-gray-100 flex justify-center items-center">
              <img class="rounded-3xl h-44 w-44" src="${shoe.imageURL}" alt="${shoe.name}">
            </div>
            <p class="text-xl font-extrabold mt-2 truncate whitespace-nowrap overflow-hidden max-w-[180px]">${shoe.name}</p>
            <p class="text-base font-semibold">$ ${shoe.price}</p>
          </div>
        `;
      });
  
      shoseItem.innerHTML += html;
      currentPage++; // صفحه بعدی
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    if (scrollTop + windowHeight >= documentHeight - 300) {
      loadMoreShoes();
    }
  });

  loadMoreShoes();

  ///////////////////////////////////////////////////////////////////
// همه دکمه‌ها رو انتخاب می‌کنیم
const buttons = document.querySelectorAll('button');

// تابعی برای تغییر رنگ یک SVG
function setSVGColor(svg, color) {
  const paths = svg.querySelectorAll('path');
  paths.forEach(path => path.setAttribute('fill', color));
}

// روی هر دکمه کلیک بشه:
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // همه دکمه‌ها رو به رنگ طوسی برمی‌گردونیم
    buttons.forEach(btn => {
      const svg = btn.querySelector('svg');
      setSVGColor(svg, '#64748b'); // یا '#212529'، بسته به رنگ طوسی شما
    });

    // دکمه کلیک‌شده رو مشکی می‌کنیم
    const currentSvg = button.querySelector('svg');
    setSVGColor(currentSvg, '#020617'); // مشکی
  });
});

homeBtn.addEventListener("click",()=>{
    location.href="/home"
});

cartBtn.addEventListener("click",()=>{
    location.href="/cart"
});

  

  