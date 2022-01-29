/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksPanel: {
      booksList: '.books-list',
      bookImage: '.book__image',
      bookRating: '.book__rating__fill',
    },
    filters: '.filters',
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  
  function render() {
    const thisRender = this;
    const booksList = document.querySelector(select.booksPanel.booksList);
    for (const book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book["ratingBgc"] = ratingBgc;
      book["ratingWidth"] = ratingWidth;
      const generatedHTML = templates.templateBook(book);
      thisRender.element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(thisRender.element);
    }
  }
  render();

  const favoriteBooks = [];
  const filters = [];

  function initActions() { //
    const booksList = document.querySelector(select.booksPanel.booksList);
    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image') == true) {
        const favoriteBookAttribute = event.target.offsetParent.getAttribute('data-id');
        const bookIndex = favoriteBooks.indexOf(favoriteBookAttribute);
        if (!favoriteBooks[bookIndex]) {
          favoriteBooks.push(favoriteBookAttribute);
          event.target.offsetParent.classList.add('favorite');
        } else {
          favoriteBooks.splice(bookIndex, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
      }
    });

    const  filtersContainer = document.querySelector(select.filters);
    filtersContainer.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.name == 'filter' && event.target.type == 'checkbox'){
        const inputValue = event.target.value;
        const filterIndex = filters.indexOf(inputValue);
        const checkBox = event.target.checked;
        if (checkBox == true && !filters[filterIndex]){
          filters.push(inputValue);
          // console.log('add '+ filterIndex + ' to ' + filters);
        } else if (checkBox == false){
          filters.splice(filterIndex, 1);
          // console.log('remove '+ filterIndex + ' from ' + filters);
        }
      }
      console.log('array filters:', filters);
      filterBook();
    });
  }
  initActions();

  function filterBook() {
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      for (const filter of filters) {
        if(book.details[filter]) { // w zadaniu bylo !book.details[filter]
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage =  document.querySelector('.book__image[data-id="'+ book.id + '"]');
      if(shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }
  
}