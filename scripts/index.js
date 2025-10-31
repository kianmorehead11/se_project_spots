function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
});

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const captionInput = newPostModal.querySelector("#profile-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

newPostBtn.addEventListener("click", () => {
  newPostForm.reset();
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => closeModal(newPostModal));

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("Caption:", captionInput.value);
  console.log("Image link:", linkInput.value);
  closeModal(newPostModal);
});

[editProfileModal, newPostModal].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    [editProfileModal, newPostModal].forEach(closeModal);
  }
});
