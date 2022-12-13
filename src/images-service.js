import axios from 'axios';

export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
}

async function getImages() {
    const API_KEY = '32048668-e2fb2d2180cb5d2e63ce535ce';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=&{this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
    const options = {
        headers: {
            Autorization: 'API_KEY';
        }
    }

    try {
        const response = await axios.get('${BASE_URL}');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
