// ==========================
// Navigation Buttons
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("navigationBtn");
  const getstarted = document.getElementById("get-started");
  const buyer = document.getElementById("BuyerBtn");

  if (button) button.addEventListener("click", () => window.location.href = "athu/farmersRegistration.html");
  if (getstarted) getstarted.addEventListener("click", () => window.location.href = "athu/farmersRegistration.html");
  if (buyer) buyer.addEventListener("click", () => window.location.href = "athu/buyersResgistration.html");
});

// ==========================
// File Upload Display
// ==========================
const fileInput = document.getElementById("photoUpload");
const fileName = document.getElementById("fileName");

if (fileInput && fileName) {
  fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files.length ? fileInput.files[0].name : "No file chosen";
  });
}

// ==========================
// Initialize localStorage for farmers
// ==========================
if (!localStorage.getItem("farmers")) localStorage.setItem("farmers", JSON.stringify([]));

// ==========================
// Farmer Registration Form
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("farmerForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const locationInput = document.getElementById("location").value.trim();
    const ninInput = document.getElementById("nin").value.trim();
    const terms = document.getElementById("terms").checked;

    let errors = [];
    if (!firstName) errors.push("First name is required.");
    if (!lastName) errors.push("Last name is required.");
    if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) errors.push("Invalid email address.");
    if (!phone.match(/^\d{11}$/)) errors.push("Phone number must be 11 digits.");
    if (password.length < 6) errors.push("Password must be at least 6 characters.");
    if (password !== confirmPassword) errors.push("Passwords do not match.");
    if (!locationInput) errors.push("Location is required.");
    if (!ninInput) errors.push("NIN is required.");
    if (!terms) errors.push("You must accept the terms and conditions.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    let farmers = JSON.parse(localStorage.getItem("farmers")) || [];
    if (farmers.some(f => f.email === email)) {
      alert("This email is already registered!");
      return;
    }

    const newUser = { firstName, lastName, email, phone, password, location: locationInput, nin: ninInput };
    farmers.push(newUser);
    localStorage.setItem("farmers", JSON.stringify(farmers));

    alert("Signup successful!");
    window.location.href = "./login.html";
  });
});

// ==========================
// Login Form
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const errorMsg = document.querySelector("#error-msg");
  const eyeOpen = document.querySelector("#eyeOpen");
  const eyeClosed = document.querySelector("#eyeClosed");

  if (!loginForm || !emailInput || !passwordInput) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value;

    if (!emailVal || !passwordVal) {
      showError("Please fill in both fields.");
      return;
    }

    const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
    const user = farmers.find(u => u.email === emailVal && u.password === passwordVal);

    if (!user) {
      showError("Invalid email or password.");
      return;
    }

    showError("");
    alert(`Welcome back, ${user.firstName}!`);
    window.location.href = "../index.html";
  });

  function showError(msg) {
    if (errorMsg) {
      errorMsg.textContent = msg;
      errorMsg.style.color = "red";
    }
  }

  if (eyeOpen && eyeClosed) {
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
  }
});

// ==========================
// Social Login (Demo Mode)
// ==========================
function handleFBLogin() {
  const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
  const fbUser = { firstName: "FBUser", lastName: "", email: "fbuser@example.com", phone: "", password: "facebook", location: "", nin: "" };

  if (!farmers.some(u => u.email === fbUser.email)) {
    farmers.push(fbUser);
    localStorage.setItem("farmers", JSON.stringify(farmers));
  }

  alert("Logged in with Facebook as " + fbUser.firstName);
  window.location.href = "../index.html";
}

function handleGoogleLogin() {
  const farmers = JSON.parse(localStorage.getItem("farmers")) || [];
  const googleUser = { firstName: "GoogleUser", lastName: "", email: "googleuser@example.com", phone: "", password: "google", location: "", nin: "" };

  if (!farmers.some(u => u.email === googleUser.email)) {
    farmers.push(googleUser);
    localStorage.setItem("farmers", JSON.stringify(farmers));
  }

  alert("Logged in with Google as " + googleUser.firstName);
  window.location.href = "../index.html";
}


const fbBtn = document.querySelector("#facebookSignIn");
const googleBtn = document.querySelector("#googleSignIn");
if (fbBtn) fbBtn.addEventListener("click", handleFBLogin);
if (googleBtn) googleBtn.addEventListener("click", handleGoogleLogin);
