import './sass/_common.scss';
import refs from './refs';
import NewApiService from './images-service';
import articlesTpl from './templates/articles.hbs';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
    evt.preventDefault();
    clearArticlesContainer();
    imagesApiService.query = evt.currentTarget.elements.searchQuery.value;
    if (imagesApiService.query === '') {
        return Notify.failure('Sorry, there are no text');
    }
    imagesApiService.resetPage();
    imagesApiService.getImages().then(appendArticlesMarkup);
    // SimpleLightbox.refresh();
}

function onLoadMore() {
    imagesApiService.getImages().then(appendArticlesMarkup);
    // SimpleLightbox.refresh();
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';
}
