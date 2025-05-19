import { login } from "../api/auth";
import { tokenName } from "../lib/constant";




const userNameInput=document.getElementById("username");
const passwordInput=document.getElementById("password");
const usernameError = document.getElementById("username-err");
const passwordError = document.getElementById("password-err");
const systemError = document.getElementById("password-err");


const togglePasswordBtn = document.getElementById("toggle-password");
const togglePasswordIcon = document.getElementById("toggle-password-icon");
const passwordInputField = document.getElementById("password");

const backButtom=document.getElementById('back-btn');

const showErrors = (msg) => {
    if (msg.includes("username")) {
      usernameError.innerText = "username is required";
      usernameError.classList.remove("hidden");
    } else if (msg.includes("password")) {
      passwordError.innerText = "password is required";
      passwordError.classList.remove("hidden");
    } else {
      systemError.innerText = "There was a problem, please try again later";
      systemError.classList.remove("hidden");
    }
  };

  const clearError = () => {
    systemError.classList.add("hidden");
    usernameError.classList.add("hidden");
    passwordError.classList.add("hidden");
  };


document.getElementById("form-login").addEventListener('submit',async(event)=>{
    event.preventDefault();
    clearError();
    
    const userNameValue=userNameInput.value;
    const passwordValue=passwordInput.value;
   
    const data={username:userNameValue,password:passwordValue}
    try{
        const resBody=await login(data);
        console.log(resBody);
        console.log(resBody.token)
        localStorage.setItem(tokenName, resBody.token);
      location.href = "/home";
        
    }
    catch (error) {
        const msg = error.response?.data?.message;
        if (Array.isArray(msg)) {
          msg.forEach(showErrors);
          console.log("A")
          return;
        }
        if (typeof msg === "string") {
          showErrors(msg);
          console.log("b")
          return;
        }
        console.log(error);
        console.log("c")
        showErrors("Something went wrong");
      }
    
    
})

togglePasswordBtn.addEventListener("click", () => {
    const isPasswordVisible = passwordInputField.type === "text";
  
    passwordInputField.type = isPasswordVisible ? "password" : "text";
  
    togglePasswordIcon.src = isPasswordVisible
      ? "public/assets/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 (1).svg" // چشم خط‌خورده
      : "public/assets/visibility_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"; // چشم باز
  });


 

    backButtom.addEventListener("click", () => {
        if (window.history.length > 1) {
          history.back();
        } else {
          location.href = "/slider";//این اولین صفحه اسلایدرو میاره نه اخری نمیدونم چیکارش کنم
        }
      });

 