import './sass/_common.scss';
import refs from './refs';
import NewApiService from './images-service';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const imagesApiService = new NewApiService();
// import axios, {isCancel, AxiosError} from 'axios';
// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });
// console.log(axios.isCancel('something'));

function onSearch(evt) {
    evt.preventDefault();
    clearArticlesContainer();
    imagesApiService.searchQuery = evt.currentTarget.elements.searchQuery.value;
    if (imagesApiService.searchQuery === '') {
        return Notify.failure('Sorry, there are no text');
    }
    imagesApiService.resetPage();
    imagesApiService.getImages().then(appendArticlesMarkup);

}
