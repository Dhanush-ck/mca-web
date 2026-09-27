const form = document.getElementById("jobForm");

const name = document.getElementById("name");
const age = document.getElementById("age");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const securityQuestion = document.getElementById("securityQuestion");
const securityAnswer = document.getElementById("securityAnswer");

const email = document.getElementById("email");
const phone = document.getElementById("phone");
const homePhone = document.getElementById("homePhone");

const cv = document.getElementById("cv");

function showError(input, errorId, message) {

  const error = document.getElementById(errorId);

  input.classList.add("input-error");
  input.classList.remove("input-success");

  error.textContent = message;

}

function showSuccess(input, errorId) {

  const error = document.getElementById(errorId);

  input.classList.remove("input-error");
  input.classList.add("input-success");

  error.textContent = "";

}

function clearValidation(input, errorId) {

  const error = document.getElementById(errorId);

  input.classList.remove("input-error", "input-success");

  error.textContent = "";

}

function validateName() {

  if (name.value.trim() === "") {

    showError(
      name,
      "nameError",
      "Please enter your name."
    );

    return false;
  }

  if (name.value.trim().length < 3) {

    showError(
      name,
      "nameError",
      "Name must contain at least 3 characters."
    );

    return false;
  }

  showSuccess(name, "nameError");

  return true;

}

function validateAge() {

  const value = Number(age.value);

  if (age.value === "") {

    showError(
      age,
      "ageError",
      "Please enter your age."
    );

    return false;
  }

  if (value < 15 || value > 100) {

    showError(
      age,
      "ageError",
      "Age must be between 15 and 100."
    );

    return false;
  }

  showSuccess(age, "ageError");

  return true;

}

function validatePassword() {

  if (password.value === "") {

    showError(
      password,
      "passwordError",
      "Please enter a password."
    );

    return false;
  }

  if (password.value.length < 8) {

    showError(
      password,
      "passwordError",
      "Password must contain at least 8 characters."
    );

    return false;
  }

  showSuccess(password, "passwordError");

  return true;

}

function validateConfirmPassword() {

  if (confirmPassword.value === "") {

    showError(
      confirmPassword,
      "confirmPasswordError",
      "Please confirm your password."
    );

    return false;
  }

  if (confirmPassword.value !== password.value) {

    showError(
      confirmPassword,
      "confirmPasswordError",
      "Passwords do not match."
    );

    return false;
  }

  showSuccess(confirmPassword, "confirmPasswordError");

  return true;

}

function validateSecurityQuestion() {

  if (securityQuestion.value.trim() === "") {


    showError(
      securityQuestion,
      "securityQuestionError",
      "Please enter a security question."
    );

    return false;

  }

  if (securityQuestion.value.trim().length < 5) {

    showError(
      securityQuestion,
      "securityQuestionError",
      "Security question must contain at least 5 characters."
    );

    return false;

  }

  showSuccess(
    securityQuestion,
    "securityQuestionError"
  );

  return true;
}

function validateSecurityAnswer() {

  if (securityAnswer.value.trim() === "") {


    showError(
      securityAnswer,
      "securityAnswerError",
      "Please enter a security answer."
    );

    return false;

  }

  if (securityAnswer.value.trim().length < 2) {

    showError(
      securityAnswer,
      "securityAnswerError",
      "Security answer must contain at least 2 characters."
    );

    return false;

  }

  showSuccess(
    securityAnswer,
    "securityAnswerError"
  );

  return true;
}


function validateEmail() {

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  if (email.value.trim() === "") {

    showError(
      email,
      "emailError",
      "Please enter your email address."
    );

    return false;
  }


  if (!emailRegex.test(email.value.trim())) {

    showError(
      email,
      "emailError",
      "Please enter a valid email address."
    );

    return false;
  }


  showSuccess(email, "emailError");

  return true;

}

function validatePhone() {

  const phoneRegex = /^[6-9][0-9]{9}$/;


  if (phone.value.trim() === "") {

    showError(
      phone,
      "phoneError",
      "Please enter your phone number."
    );

    return false;
  }


  if (!phoneRegex.test(phone.value.trim())) {

    showError(
      phone,
      "phoneError",
      "Enter a valid 10-digit mobile number."
    );

    return false;
  }


  showSuccess(phone, "phoneError");

  return true;

}

function validateHomePhone() {

  if (homePhone.value.trim() === "") {

    clearValidation(homePhone, "homePhoneError");

    return true;
  }


  const phoneRegex = /^[0-9]{10}$/;


  if (!phoneRegex.test(homePhone.value.trim())) {

    showError(
      homePhone,
      "homePhoneError",
      "Enter a valid 10-digit phone number."
    );

    return false;
  }


  showSuccess(homePhone, "homePhoneError");

  return true;

}

function validateCV() {

  const error = document.getElementById("cvError");

  // No file selected
  if (cv.files.length === 0) {

    error.textContent = "Please upload your CV.";

    cv.classList.add("input-error");

    return false;

  }

  const file = cv.files[0];

  // Allowed file types
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  // Check file type
  if (!allowedTypes.includes(file.type)) {

    error.textContent =
      "Only PDF, DOC, or DOCX files are allowed.";

    cv.classList.add("input-error");

    return false;

  }

  // Maximum file size = 5 MB
  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {

    error.textContent =
      "File size must not exceed 5 MB.";

    cv.classList.add("input-error");

    return false;

  }

  // Valid file
  error.textContent = "";

  cv.classList.remove("input-error");
  cv.classList.add("input-success");

  return true;
}


name.addEventListener("input", validateName);
age.addEventListener("input", validateAge);

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input",validateConfirmPassword);
securityQuestion.addEventListener("input",validateSecurityQuestion);

securityAnswer.addEventListener("input",validateSecurityAnswer);

email.addEventListener("input", validateEmail);
phone.addEventListener("input", validatePhone);
homePhone.addEventListener("input",validateHomePhone);

cv.addEventListener("change", validateCV);

form.addEventListener("submit", function (event) {

  event.preventDefault();


  const validName = validateName();
  const validAge = validateAge();

  const validPassword = validatePassword();
  const validConfirmPassword =validateConfirmPassword();
  const validSecurityQuestion = validateSecurityQuestion();

  const validSecurityAnswer = validateSecurityAnswer();

  const validEmail = validateEmail();
  const validPhone = validatePhone();
  const validHomePhone = validateHomePhone();
  const validCV = validateCV();

  const isValid =
    validName &&
    validAge &&
    validPassword &&
    validConfirmPassword &&
    validSecurityQuestion &&
    validSecurityAnswer &&
    validEmail &&
    validPhone &&
    validHomePhone &&
    validCV;


  if (isValid) {
    alert("Application submitted successfully!");
  }

});

form.addEventListener("reset", function () {

  setTimeout(() => {

    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
      input.classList.remove(
        "input-error",
        "input-success"
      );
    });

    const errors =
      form.querySelectorAll(".error");

    errors.forEach(error => {
      error.textContent = "";
    });

  }, 0);

});
