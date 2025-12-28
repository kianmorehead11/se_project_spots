//@ts-nocheck
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const checkInputValidity = (formEl, inputEl, config) => {
  let valid = inputEl.value.trim() !== "";

  if (inputEl.type === "url") {
    valid = valid && isValidUrl(inputEl.value.trim());
  }

  if (!valid) {
    const msg =
      inputEl.type === "url"
        ? "Enter a valid link"
        : "This field cannot be empty";
    showInputError(formEl, inputEl, msg, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }

  return valid;
};

const hasInvalidInput = (inputList, config) => {
  return inputList.some(
    (input) => !checkInputValidity(input.closest("form"), input, config)
  );
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList, config)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const resetValidation = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => hideInputError(formEl, inputEl, config));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  disableButton(buttonEl, config);
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });

  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const allValid = inputList.every((inputEl) =>
      checkInputValidity(formEl, inputEl, config)
    );
    if (!allValid) return;
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => setEventListeners(formEl, config));
};

enableValidation(settings);

const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const checkInputValidity = (formEl, inputEl) => {
  let valid = inputEl.value.trim() !== "";
  if (inputEl.type === "url") {
    valid = valid && isValidUrl(inputEl.value.trim());
  }

  if (!valid) {
    const msg =
      inputEl.type === "url"
        ? "Enter a valid link"
        : "This field cannot be empty";
    showInputError(formEl, inputEl, msg);
  } else {
    hideInputError(formEl, inputEl);
  }

  return valid;
};

const hasInvalidInput = (inputList) => {
  return inputList.some(
    (inputEl) => !checkInputValidity(inputEl.closest("form"), inputEl)
  );
};

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("modal__submit-btn_disabled");
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove("modal__submit-btn_disabled");
  }
};

const resetValidation = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  inputList.forEach((inputEl) => hideInputError(formEl, inputEl));
  const buttonEl = formEl.querySelector(".modal__submit-btn");
  disableButton(buttonEl);
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formEl) => setEventListeners(formEl));
};
enableValidation();
