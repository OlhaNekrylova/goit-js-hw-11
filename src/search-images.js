import './sass/_common.scss';
import refs from './refs';
import NewApiService from './images-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.articlesContainer.addEventListener('click', onNewGalleryClick);

const galleryMarkup = createArticlesMarkup(imagesApiService);

function onSearch(evt) {
    evt.preventDefault();
    clearArticlesContainer();
    imagesApiService.query = evt.currentTarget.elements.searchQuery.value;
    if (imagesApiService.query === '') {
        return Notify.failure('Sorry, there are no text');
    }
    imagesApiService.resetPage();
    imagesApiService.getImages().then(appendArticlesMarkup);
    SimpleLightbox.refresh();
}

function onLoadMore() {
    imagesApiService.getImages().then(appendArticlesMarkup);
    SimpleLightbox.refresh();
}

function createArticlesMarkup(imagesApiService) {
        return imagesApiService
        .map(({ webformatURL, largeImageURL, tags }) => {
            return `
            <div class="photo-card">
                <a class="photo-card__link" href="${largeImageURL}"></a>
                <img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>{likes}</b>
                    </p>
                    <p class="info-item">
                        <b>{views}</b>
                    </p>
                    <p class="info-item">
                        <b>{comments}</b>
                    </p>
                    <p class="info-item">
                        <b>{downloads}</b>
                    </p>
                </div>
                </a>
            </div>`
        })
        .join('');
    }

function appendArticlesMarkup(imagesApiService) {
    refs.articlesContainer.insertAdjacentHTML('afterbegin', galleryMarkup);
}

const gallery = new SimpleLightbox('.gallery a', {
    // captionsData: 'alt', 
    captionDelay: 250,
});

gallery.on('show.simplelightbox', function () {
	
});

function onNewGalleryClick (event) {
    event.preventDefault();
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}
