import throttle from 'lodash.throttle';

// const FEEDBACK_FORM_STATE = 'feedback-form-state';
const form = document.querySelector('form.feedback-form');

// creating const for catching errors
const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getItemKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// hadling event with lodash.throttle
form.addEventListener('input', throttle(saveValue, 500));

// event delegate and creating object for listening form
let formData = getItemKey('feedback-form-state') || {};
function saveValue(e) {
  formData[e.target.name] = e.target.value;
  save('feedback-form-state', JSON.stringify(formData));
}

// save data to localStorage
localStorageValue();

function localStorageValue() {
  const proverka = getItemKey('feedback-form-state');
  if (proverka) {
    if (proverka.email) {
      form.email.value = proverka.email;
    }
    if (proverka.message) {
      form.message.value = proverka.message;
    }
  }
}

// Submit button (clear localStorage and form by submit);

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  // checking
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  removeKey('feedback-form-state');
  const formData = new FormData(form);
  const valuesFotm = Object.fromEntries(formData.entries());
  console.log(valuesFotm);
  e.currentTarget.reset(); // cleaning after sending form
  localStorage.removeItem('feedback-form-state');
}
