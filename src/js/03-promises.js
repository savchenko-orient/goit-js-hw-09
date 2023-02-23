import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const { delay, step, amount } = formEl.elements;
const btnSubmit = formEl.querySelector('button');
let position = 0;


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function submitFormHandler(e) {
  e.preventDefault();
  const amountValue = Number(amount.value);
  const stepValue = Number(step.value);
  const delayValue = Number(delay.value);

  for (let i = 0; i < amountValue; i += 1) {
    position += 1;
    const newDelay = stepValue * i + delayValue

    const promice = createPromise(position, newDelay);

    promice
      .then(resolve => Notify.success(resolve))
      .catch(error => Notify.failure(error))
  }
}

formEl.addEventListener("submit", submitFormHandler)