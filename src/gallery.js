// import SimpleLightbox from "simplelightbox";

// import "simplelightbox/dist/simple-lightbox.min.css";

// import { galleryItems } from './gallery-items';


// console.log(galleryItems);

// const newGallery = document.querySelector('.gallery');

// refs.articlesContainer.addEventListener('click', onNewGalleryClick);

// const galleryMarkup = createGalLeryMarkup (galleryItems);

// function createGalLeryMarkup (galleryItems) {
//     return galleryItems
//     .map(({ webformatURL, largeImageURL, tags }) => {
//         return `
//         <div class="gallery__item">
//         <a class="gallery__item" href="${largeImageURL}">
//         <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
//         </a>
//         </div>`
//     })
//     .join('');
// }

// // newGallery.insertAdjacentHTML('afterbegin', galleryMarkup);
// // console.log(newGallery);

// const gallery = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt', 
//     captionDelay: 250,
// });

// gallery.on('show.simplelightbox', function () {
	
// });

// function onNewGalleryClick (event) {
//     event.preventDefault();
// }