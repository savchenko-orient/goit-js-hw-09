const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyEl = document.querySelector('body');
let timer;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyColor() {
    timer = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

startBtn.addEventListener('click', () => {
    setBodyColor();
    startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    startBtn.disabled = false;
});