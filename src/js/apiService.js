const API_KEY = '24206659-085fc8a8bf5db593be5a49f71';

export default class GalleryApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchPictures() {
        console.log(this);

        // Option with pexels.com
        // const url = `https://api.pexels.com/v1/search?query=${this.searchQuery}&page=${this.page}&per_page=12`;
        // const options = {
        //     headers: {
        //         Authorization: '563492ad6f917000010000010a9b52cfbb704750be035a6140194de6',
        //     }
        // };
        //  return fetch(url, options)
        //     .then(r => r.json())
        //     .then(data => {
        //         console.log(data);
        //     this.incrementPage();
        //     return data.photoes;
        // });

        // Option witn pixabay.com
       const url =`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
 
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