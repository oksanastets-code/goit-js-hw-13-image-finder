import GalleryApiService from './apiService.js';
import picturesTpl from '../templates/picture-card.hbs';
import LoadMoreBtn from './components/load-more-btn.js';
import * as basicLightbox from 'basiclightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
// Exemplars
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const galleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadArticles);
refs.galleryContainer.addEventListener('click', openLigthbox);

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();
  galleryApiService.query = e.currentTarget.elements.query.value;
  if (!galleryApiService.query.trim()) {
    console.log('error');
    return;
  }
  loadMoreBtn.show();
  galleryApiService.resetPage();

  onLoadArticles();
}

function onLoadArticles() {
  loadMoreBtn.disable();
  galleryApiService
    .fetchPictures()
    .then(articles => {
      appendGalleryMarkup(articles);
// when it is a last picture in collection
      if (articles.length < 12) {
        loadMoreBtn.hide();
      } else loadMoreBtn.enable();
    })
    .then(handlerScroll);
}
// Render page
function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', picturesTpl(hits));
}
//  By start searching
function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

// Big picture by clicking on it
function openLigthbox(e) {
  // Quard Clause
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const bigPicture = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);
  bigPicture.show();
}

//Smooth scroll
function handlerScroll() {
  refs.galleryContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
