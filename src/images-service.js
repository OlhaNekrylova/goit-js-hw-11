import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NewApiService {
    constructor() {
        this.query = '';
        this.page = 1;
    }

    async getImages() {
        const API_KEY = '32048668-e2fb2d2180cb5d2e63ce535ce';
        const hits = 'hits=webformatURL,largeImageURL,tags,likes,views,comments,downloads';
        const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true${hits}&page=${this.page}$per_page=40`;
        const options = {
            headers: {
                Autorization: 'API_KEY',
            },
        }

        try {
            const response = await axios.get(`${BASE_URL}`);
            // const images = await response.json();
            this.page += 1;
            // return images;
            // console.log(images);
        } catch (error) {
            console.error(error);
            Notify.failure('Sorry, there are no images matching your search query. Please try again');
        }
    }

    resetPage() {
        this.page = 1; 
    }
}
