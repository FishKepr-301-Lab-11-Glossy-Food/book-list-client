'use strict'

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://pk-jl-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookData) {
    Object.keys(bookData).forEach(key => this[key] = bookData[key]);
  }

  Book.all = [];

  Book.prototype.toHtml=function(){
    var template = Handlebars.compile($('#book-template').text());
    return template(this);
  };

  Book.loadAll = rows => {
    Book.all = rows.sort((a,b) => b.title - a.title).map(book => new Book(book));
  }

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
      })
      .then(callback)
      .catch(errorCallback);
  };

  module.Book = Book;

})(app);