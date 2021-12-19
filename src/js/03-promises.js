// Импорт библиотеки уведомлений
import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.promice__form');

function fillFields(form) {
  const fields = {};
  const formData = new FormData(form);
  formData.forEach((value, name) => {
    fields[name] = value;
  });
  return fields;
}

function handleSubmit(event) {
  event.preventDefault();
  const fields = fillFields(event.currentTarget);
  let delay = Number.parseInt(fields.delay);
  for (let i = 1; i <= Number.parseInt(fields.amount); i += 1) {
    let promise = createPromise(i, delay);
    delay += Number.parseInt(fields.step);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', handleSubmit);
