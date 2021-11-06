import GalleryApiService from './apiService.js';
import picturesTpl from '../templates/picture-card.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMmoreBtn: document.querySelector('[data-action="load-more"]'),
};
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMmoreBtn.addEventListener('click', onLoadMore);

const galleryApiService = new GalleryApiService();

function onSearch(e) {
  e.preventDefault();
  galleryApiService.query = e.currentTarget.elements.query.value;
    galleryApiService.resetPage();
    galleryApiService.fetchPictures().then(appendGalleryMarkup);
}
function onLoadMore() {
  galleryApiService.fetchPictures().then(appendGalleryMarkup);
}
// function appendGalleryMarkup(photoes) {
//     refs.galleryContainer.insertAdjacentHTML('beforeend', picturesTpl(photoes));
// }
function appendGalleryMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', picturesTpl(hits));
}