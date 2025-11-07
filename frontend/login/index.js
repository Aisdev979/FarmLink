// Variables
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMsg = document.querySelector("#error-msg"); 
const eyeOpen = document.querySelector("#eyeOpen");
const eyeClosed = document.querySelector("#eyeClosed");

// Form events
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailOrPhone = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // validation
  if (!emailOrPhone || !password) {
    showError("Please fill in both fields.");
    return;
  }

  
  const isEmail = emailOrPhone.includes("@");
  const isPhone = /^\d{10,15}$/.test(emailOrPhone); 

  if (!isEmail && !isPhone) {
    showError("Enter a valid email or phone number.");
    return;
  }

 
  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

 
  showError("");
  console.log("Form submitted successfully");


  const userData = {
    emailOrPhone,
    password,
  };

  console.log("Sending to backend:", userData);
  alert("Login successful ");
});

// Error display
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.color = "red";
}

eyeOpen.addEventListener("click", () => {
  passwordInput.type = "text";
  eyeOpen.classList.add("hidden");
  eyeClosed.classList.remove("hidden");
});

eyeClosed.addEventListener("click", () => {
  passwordInput.type = "password";
  eyeClosed.classList.add("hidden");
  eyeOpen.classList.remove("hidden");
});
