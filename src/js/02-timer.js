// Импорт календаря
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import '../css/flatpikr.css';
// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  fontSize: '46px',
  width: '50%',
  clickToClose: true,
  useIcon: false,
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' && v2.2.0 and the next versions => 'center-top' - 'center-bottom' - 'center-center'
  timeout: 3000,
});

const startButton = document.querySelector('button[timer-start]');
startButton.setAttribute('disabled', '');

const selector = '#datetime-picker';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const newValue = {};
  for (const key in value) {
    const text = String(value[key]);
    if (text.length < 2) {
      newValue[key] = text.padStart(2, '0');
    } else {
      newValue[key] = text;
    }
  }
  return newValue;
}

const fillTime = ({ days, hours, minutes, seconds }) => {
  document.querySelector('.value[data-days]').textContent = days;
  document.querySelector('.value[data-hours]').textContent = hours;
  document.querySelector('.value[data-minutes]').textContent = minutes;
  document.querySelector('.value[data-seconds]').textContent = seconds;
};

const refreshTime = () => {
  const ms = fp.selectedDates[0].getTime() - new Date();
  const fields = convertMs(ms);
  fillTime(addLeadingZero(fields));
};

let timerId = null;

const startTimer = () => {
  timerId = setInterval(refreshTime, 1000);
  startButton.textContent = 'Stop';
  startButton.addEventListener('click', stopTimer);
  startButton.removeEventListener('click', startTimer);
};

const stopTimer = () => {
  clearTimeout(timerId);
  startButton.addEventListener('click', startTimer);
  startButton.removeEventListener('click', stopTimer);
  startButton.textContent = 'Start';
};

startButton.addEventListener('click', startTimer);
