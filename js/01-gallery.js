import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const ImagesMarkup = createImagesMarkup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", ImagesMarkup);

galleryEl.addEventListener("click", onGalleryItemClick);

function createImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
        `;
    })
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();
  if (!event.target.dataset.source) {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}">
  `);

  instance.show();
  console.log(event.target.dataset.source);

  const onClose = () => {
    instance.close();
    document.removeEventListener("keydown", onEscapeKeyDown);
  };

  const onEscapeKeyDown = (event) => {
    if (event.code === "Escape") {
      onClose();
    }
  };

  document.addEventListener("keydown", onEscapeKeyDown);
  console.dir(event.target);
}
