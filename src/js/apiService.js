const API_KEY = '24206659-085fc8a8bf5db593be5a49f71';
const BASE_URL = 'https://pixabay.com/api';
export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchPictures() {
       const url =`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
 
        return fetch(url)
            .then(r => r.json())
            .then(data => {
                console.log(data);
            this.incrementPage();
            return data.hits;
        });
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
    this.searchQuery = newQuery;
    }
}