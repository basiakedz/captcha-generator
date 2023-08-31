const reloadButton = document.querySelector(".reload-btn");
const captchaText = document.querySelector(".card__captcha-text");
const captchaInput = document.querySelector(".card__captcha-input");
const verifyButton = document.querySelector(".verify-btn");

const randomChar = () => {
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const allChars = lowercaseLetters + uppercaseLetters + number;

  const randomIndex = Math.floor(Math.random() * allChars.length);
  const randomChar = allChars[randomIndex];

  return randomChar;
};

const generateRandomString = (length) => {
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += randomChar();
  }

  return randomString;
};

const stringLengh = 8;
const randomString = generateRandomString(stringLengh);
captchaText.value = randomString;

reloadButton.addEventListener("click", () => {
  const newRandomString = generateRandomString(stringLengh);
  captchaText.value = newRandomString;
  captchaInput.value = "";
  verifyButton.style.opacity = "0.5";
});

captchaInput.addEventListener("input", () => {
  if (captchaInput.value.length > 0) {
    verifyButton.style.opacity = "1";
  } else {
    verifyButton.style.opacity = "0.5";
  }
});

verifyButton.style.opacity = "0.5";

verifyButton.addEventListener("click", verifyCaptcha);
captchaInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    verifyCaptcha();
  }
});

function verifyCaptcha() {
  const captchaInputValue = captchaInput.value;
  const captchaTextValue = captchaText.value;

  if (captchaInputValue === captchaTextValue) {
    alert("Entered captcha is correct");
  } else {
    alert("The captcha is wrong! Please try again");
  }
}
