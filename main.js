const reloadButton = document.querySelector(".reload-btn");
const captchaInput = document.querySelector(".card__captcha-input");
const verifyButton = document.querySelector(".verify-btn");
const captchaHandler = {
  element: document.querySelector('.card__captcha-canvas'),
  stringCode: '',
  set code(captchaCode) {
    const context = this.element.getContext('2d');
    context.clearRect(0, 0, this.element.width, this.element.height);
    this.stringCode = captchaCode;

    context.font = 'italic bold 48px Times';
    context.lineWidth = 2;
    const captchaCodeMetrics = context.measureText(captchaCode);

    context.strokeText(
        captchaCode,
        (this.element.width - captchaCodeMetrics.width) / 2,
        (this.element.height + 30) / 2
    );
  }
};

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

const stringLength = 8;
const randomString = generateRandomString(stringLength);
captchaHandler.code = randomString;

reloadButton.addEventListener("click", () => {
  const newRandomString = generateRandomString(stringLength);
  captchaHandler.code = newRandomString;
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
  const captchaTextValue = captchaHandler.stringCode;

  if (captchaInputValue === captchaTextValue) {
    alert("Entered captcha is correct");
  } else {
    alert("The captcha is wrong! Please try again");
  }
}
