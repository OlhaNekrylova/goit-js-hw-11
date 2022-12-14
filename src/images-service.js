import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const API_KEY = '32048668-e2fb2d2180cb5d2e63ce535ce';
const hits = 'hits=webformatURL,largeImageURL,tags,likes,views,comments,downloads';

export async function getImages(query, page, perPage) {
        const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&${hits}&page=${page}&per_page=${perPage}`;
        const options = {
            headers: {
                Autorization: 'API_KEY',
            },
        }

        try {
            const response = await axios.get(`${BASE_URL}`, options);
            const images = await response.json();
            page += 1;
            return images;
            
        } catch(error) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again')
        };
}


    

    

