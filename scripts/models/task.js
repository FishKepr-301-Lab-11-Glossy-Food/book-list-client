'use strict'

var app = app || {};

//creates object ENV
const ENV = {};

//creates a boolean: looking for https:.  If true, production, else development
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://pk-jl-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';

//tertiary: is it pproduction?  if yes, use prod path, else dev path
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  //constructor function
  function Book(bookData) {
    Object.keys(bookData).forEach(key => this[key] = bookData[key]);
    //Object.assign(this, bookdata); is even refactored portion.  look up in MDN
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
    //connects from server to client
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
      })
      .then(callback)
      .catch(errorCallback);
  };

  module.Book = Book;

})(app);