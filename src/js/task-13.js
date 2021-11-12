import GalleryApiService from './apiService.js';
import picturesTpl from '../templates/picture-card.hbs';
import LoadMoreBtn from './components/load-more-btn.js';
import * as basicLightbox from 'basiclightbox';
import { myError } from './components/pnotify.js';

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
  // Verification on empty request
  if (!galleryApiService.query.trim()) {
    myError('Please, enter keyword!');
    reloadOnError();
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
      if (articles.length === 0) {
        myError('Wrong request!');
        loadMoreBtn.hide();
        reloadOnError();
        return;
      }
      appendGalleryMarkup(articles);
      // when it is a last picture in collection
      if (articles.length < 12) {
        loadMoreBtn.hide();
      } loadMoreBtn.enable();
    })
    .then(handlerScroll)
    .catch((error)=> 'error');
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
// To remove wrong request
function reloadOnError() { 
  setTimeout(() => {
      window.location.reload(true);
    }, 3000)
}