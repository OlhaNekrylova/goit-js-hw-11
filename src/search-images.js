import './sass/index.scss';
import { getImages } from './images-service';
import { onScroll, onToTopBtn } from './scroll';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');

let query = '';
let page = 1;
let perPage = 40;
let simpleLightBox; 

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);
gallery.addEventListener('click', onNewGalleryClick);

onScroll();
onToTopBtn();

function onSearchForm(evt) {
    evt.preventDefault();
    window.scrollTo({ top: 0 });
    page = 1;
    query = evt.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');

    if (query === '') {
        return Notify.failure('The search string cannot be empty. Please specify your search query.');
    }
    
    getImages(query, page, perPage)
    .then(({ data }) => {
        if (data.totalHits > perPage) {
            loadMoreBtn.classList.remove('is-hidden');
        }

        if (data.totalHits === 0) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            renderGallery(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            return Notify.success(`Hooray! We found ${data.totalHits} images.`); 
        }
    })
    .catch(error => Notify.failure('Sorry, there are no images matching your search query. Please try again'));
}

function onLoadMoreBtn() {
    page += 1;
    simpleLightBox = simpleLightBox.destroy();

    getImages(query, page, perPage)
    .then(({ data }) => {
        const totalPages = Math.ceil(data.totalHits / perPage);

        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        if (page > totalPages) {
            loadMoreBtn.classList.add('is-hidden');
            return Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    })
    .catch(error => Notify.failure("We're sorry, but you've reached the end of search results."));
}

function renderGallery(images) {
    const markup = images
    .map(image => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
        return `
        <a class="gallery__link" href="${largeImageURL}">
            <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
            </div>
        </a>
        `
        })
        .join('');

        gallery.insertAdjacentHTML('beforeend', markup);   
}

function onNewGalleryClick (event) {
    event.preventDefault();
}