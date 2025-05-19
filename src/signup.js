import { signup } from "../api/auth";
import { tokenName } from "../lib/constant";

// الگوی رمز عبور
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%#*?&])[A-Za-z\d$@$!#%*?&]{8,24}$/;

// گرفتن عناصر DOM
const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("username-err");
const passwordError = document.getElementById("password-err");
const systemError = document.getElementById("system-err");

//این واسه چشمه
const togglePasswordBtn = document.getElementById("toggle-password");
const togglePasswordIcon = document.getElementById("toggle-password-icon");
const passwordInputField = document.getElementById("password");


const backButtom=document.getElementById('back-btn');

// نمایش پیام خطا
const showErrors = (msg) => {
  if (msg.includes("username")) {
    usernameError.innerText = msg;
    usernameError.classList.remove("hidden");
  } else if (msg.includes("password")) {
    passwordError.innerText = msg;
    passwordError.classList.remove("hidden");
  } else {
    systemError.innerText = msg;
    systemError.classList.remove("hidden");
  }
};

// پاک کردن پیام‌های خطا
const clearError = () => {
  systemError.classList.add("hidden");
  usernameError.classList.add("hidden");
  passwordError.classList.add("hidden");
};

// تابع اعتبارسنجی ورودی‌ها
const validateInputs = (username, password) => {
  let hasError = false;
  clearError();

  // اعتبارسنجی نام کاربری
  if (!username) {
    usernameError.innerText = "Username is not found";
    usernameError.classList.remove("hidden");
    hasError = true;
  } else if (username.length < 5) {
    usernameError.innerText = "Username must be at least 5 characters.";
    usernameError.classList.remove("hidden");
    hasError = true;
  }

  // اعتبارسنجی رمز عبور
  if (!password) {
    passwordError.innerText = "Password is not found";
    passwordError.classList.remove("hidden");
    hasError = true;
  } else if (!passwordRegex.test(password)) {
    passwordError.innerText =
      "Password must be 8-24 characters and include uppercase, lowercase, number and special character.";
    passwordError.classList.remove("hidden");
    hasError = true;
  }

  return !hasError;
};

// مدیریت رویداد سابمیت فرم
document.getElementById("form-signup").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = userNameInput.value.trim();
  const password = passwordInput.value.trim();

  // اعتبارسنجی
  const isValid = validateInputs(username, password);
  if (!isValid) return;

  const data = { username, password };

  try {
    const resBody = await signup(data);
    localStorage.setItem(tokenName, resBody.token);
    location.href = "/home"; // انتقال به صفحه خانه بعد از ثبت‌نام موفق
  } catch (error) {
    const msg = error.response?.data?.message;
    if (Array.isArray(msg)) {
      msg.forEach(showErrors);
    } else if (typeof msg === "string") {
      showErrors(msg);
    } else {
      console.log(error);
      showErrors("Something went wrong");
    }
  }
});






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
      location.href = "/slider";
    }
  });