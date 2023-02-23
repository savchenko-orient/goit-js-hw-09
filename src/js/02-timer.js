import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector("[data-start]");
const dataPicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate;

const NOTIFY_OPTIONS = {
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    clickToClose: true,
};

const OPTIONS = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();

        if (isValidDate(selectedDate)) {
            startBtn.disabled = false;
            setSelectedDate(selectedDate);
        } else {
            Notify.failure("Please choose a date in the future", NOTIFY_OPTIONS)
        }
    },
};

flatpickr(dataPicker, OPTIONS);

startBtn.addEventListener('click', timer);

function getCurrentDate() {
    return new Date().getTime();
}
function setSelectedDate(date) {
    selectedDate = date;
}
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

function isValidDate(date) {
    return date > getCurrentDate();
}

function timer() {
    setInterval(setTime, 1000)
}

function setTime() {
    const timeLeft = selectedDate - getCurrentDate();
    const convertedSelectDate = convertMs(timeLeft);
    updateValues(convertedSelectDate);
}

function setDefaultValues() {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

function updateValues(data) {
    if (data.seconds < 0) {
        setDefaultValues()
        return;
    }

    daysEl.textContent = addLeadingZero(data.days)
    hoursEl.textContent = addLeadingZero(data.hours)
    minutesEl.textContent = addLeadingZero(data.minutes)
    secondsEl.textContent = addLeadingZero(data.seconds)
}

