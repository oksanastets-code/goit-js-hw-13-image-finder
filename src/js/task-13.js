import GalleryApiService from './apiService.js';
import picturesTpl from '../templates/picture-card.hbs';
import LoadMoreBtn from './components/load-more-btn.js';
import * as basicLightbox from 'basiclightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch); //, handlerScroll);
loadMoreBtn.refs.button.addEventListener('click', onLoadArticles); //, handlerScroll);
refs.galleryContainer.addEventListener('click', openLigthbox);
const galleryApiService = new GalleryApiService();

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();
  galleryApiService.query = e.currentTarget.elements.query.value;
loadMoreBtn.show();
  galleryApiService.resetPage();
  
  onLoadArticles();
 
}
function onLoadArticles() {
  loadMoreBtn.disable();
  galleryApiService.fetchPictures().then((articles) => {
    appendGalleryMarkup(articles),
      loadMoreBtn.enable()
  });
  }

//Smooth scroll :(
// function handlerScroll() {
//   refs.box.scrollIntoView({block: "end", behavior: "smooth"});
// }

// Option with pexels.com
// function appendGalleryMarkup(photoes) {
//     refs.galleryContainer.insertAdjacentHTML('beforeend', picturesTpl(photoes));
// }
function appendGalleryMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', picturesTpl(hits));
}
function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function openLigthbox(e) {
   // Quard Clause
    if (e.target.nodeName !== 'IMG') {
        return;
  }

  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);

instance.show()
}