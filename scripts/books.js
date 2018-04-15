'use strict'

var app = app || {};

(function(module) {

  function Book(bookData) {
    Object.keys(bookData).forEach(key => this[key] = bookData[key]);
  }
  
  Book.all = [];

  Book.prototype.toHtml=function(){
    var template = Handlebars.compile($('#book-template').text());
    return template(this);
  };

  module.Book = Book;
}(app));
