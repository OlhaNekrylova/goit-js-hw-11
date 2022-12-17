import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '32048668-e2fb2d2180cb5d2e63ce535ce';

export async function getImages(query, page, perPage) {
        try {
            const config = {
                responseType: 'json',
                baseURL: 'https://pixabay.com/api',
            };

            const response = await axios.get(
                `/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`, 
                config
                );
            
            return response;
            
        } catch(error) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again')
        };
}


    

    

