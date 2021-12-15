function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
stopButton.setAttribute('disabled', '');
let timerId = null;

const switchBodyColor = () => {
  const color = getRandomHexColor();
  document.querySelector('body').style = `background-color:${color};`;
};

const startTimer = () => {
  startButton.setAttribute('disabled', '');
  stopButton.removeAttribute('disabled');
  switchBodyColor();
  timerId = setInterval(switchBodyColor, 1000);
};

const stopTimer = () => {
  clearTimeout(timerId);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', '');
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
