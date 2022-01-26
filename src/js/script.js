/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksPanel: {
      bookList: '.books-panel .books-list',
      bookImage: '.books-list .book__image',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  function render() {
    const thisRender = this;
    for (const book in dataSource.books) {
      const books = dataSource.books[book];
      // console.log('books: ', books);
      const generatedHTML = templates.templateBook(books);
      // console.log('generatedHTML: ', generatedHTML);
      thisRender.element = utils.createDOMFromHTML(generatedHTML);
      // console.log('thisRender.element: ', thisRender.element);
      const bookList = document.querySelector(select.booksPanel.bookList);
      // console.log('bookList: ', bookList);
      bookList.appendChild(thisRender.element);
    }
  }
  render();

  const favoriteBooks = [];

  function initActions() {
    // const thisInitAction = this;
    const bookImages = document.querySelectorAll(select.booksPanel.bookImage);
    // console.log('bookImage: ', bookImages);
    for (const image of bookImages) {
      // console.log('images: ', image);
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        // console.log('double click check');
        if (this.classList.contains('favorite') == true){
          this.classList.remove('favorite');
          console.log('class removed');
        } else {
          this.classList.add('favorite');
          const imageAttribute = this.getAttribute('data-id');
          favoriteBooks.push(imageAttribute);
          // console.log('favoriteBooks: ', favoriteBooks);
        }
      });
    }
  }
  initActions();
}