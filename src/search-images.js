import './sass/_common.scss';
import { getImages } from './images-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    body: document.querySelector("body"),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.articlesContainer.addEventListener('click', onNewGalleryClick);

let query = '';
let page = 1;
let perPage = 40;

let simpleLightBox;

function onSearch(evt) {
    evt.preventDefault();
    query = evt.currentTarget.elements.searchQuery.value.trim();
    clearArticlesContainer();
    refs.loadMoreBtn.classList.add('is-hidden');
    if (query === '') {
        return Notify.failure('Sorry, there are no text');
    }
    resetPage();

    getImages(query, page, perPage)
    .then(({ images }) => {
        if (images.totalHits === 0) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else if (images.totalHits > perPage) {
            refs.loadMoreBtn.classList.remove('is-hidden');
        } else  {
            refs.articlesContainer.insertAdjacentHTML('beforeend', renderGallery(images));
            page += 1;
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            return Notify.success(`Hooray! We found ${images.totalHits} images.`); 
        } 
        })
    .catch(error => Notify.failure('Sorry, there are no images matching your search query. Please try again'));
}

function onLoadMore() {
    // page += 1;
    // simpleLightBox.destroy();

    getImages(query, page, perPage)
    .then(({ images }) => {
        if (images.totalHits < perPage) {
            refs.loadMoreBtn.classList.add('is-hidden');
            return Notify.failure("We're sorry, but you've reached the end of search results.");
        }

        refs.articlesContainer.insertAdjacentHTML('beforeend', renderGallery(images));
        page += 1;
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    })
    .catch(error => Notify.failure('Sorry, there are no images matching your search query. Please try again'));
}

function renderGallery(images) {
    const markup = images
        .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <a class="photo-card__link" href="${largeImageURL}">
            <img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>${likes}</b></p>
                <p class="info-item"><b>${views}</b></p>
                <p class="info-item"><b>${comments}</b></p>
                <p class="info-item"><b>${downloads}</b></p>
            </div>
            </a>
        </div>`
        })
        .join('');
        return markup;    
}

function resetPage() {
    page = 1; 
}

function onNewGalleryClick (event) {
    event.preventDefault();
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}

// function createArticlesMarkup(hits) {
//         return imagesCard
//         .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
//             return `
//             <div class="photo-card">
//                 <a class="photo-card__link" href="${largeImageURL}">
//                 <img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//                 <div class="info">
//                     <p class="info-item">
//                         <b>${likes}</b>
//                     </p>
//                     <p class="info-item">
//                         <b>${views}</b>
//                     </p>
//                     <p class="info-item">
//                         <b>${comments}</b>
//                     </p>
//                     <p class="info-item">
//                         <b>${downloads}</b>
//                     </p>
//                 </div>
//                 </a>
//             </div>`
//         })
//         .join('');
//     }

// refs.articlesContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

// function appendArticlesMarkup(galleryMarkup) {
//     refs.articlesContainer.insertAdjacentHTML('afterbegin', galleryMarkup);
// }

// const gallery = new SimpleLightbox('.gallery a', {
//     // captionsData: 'alt', 
//     captionDelay: 250,
// });

// simpleLightBox.on('show.simplelightbox', function () {
	
// });

