/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksPanel: {
      booksList: '.books-panel .books-list',
      bookImage: '.books-list .book__image',
    },
    filters: '.filters',
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  function render() {
    const thisRender = this;
    for (const book in dataSource.books) {
      const books = dataSource.books[book];
      const generatedHTML = templates.templateBook(books);
      thisRender.element = utils.createDOMFromHTML(generatedHTML);
      const booksList = document.querySelector(select.booksPanel.booksList);
      booksList.appendChild(thisRender.element);
    }
  }
  render();

  const favoriteBooks = [];

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
      console.log(event);
      if(event.target.tagName == 'INPUT' && event.target.name == 'filter' && event.target.type == 'checkbox'){
        const inputValue = event.target.value;
        const filterIndex = filters.indexOf(inputValue);
        const checkBox = event.target.checked;
        if (checkBox == true && !filters[filterIndex]){
          filters.push(inputValue);
          console.log('add '+ filterIndex + ' to ' + filters);
        } else if (checkBox == false){
          filters.splice(filterIndex, 1);
          console.log('remove '+ filterIndex + ' from ' + filters);
        }
      }
      console.log('array filters:', filters);
    });
  }
  initActions();

  const filters = [];

}