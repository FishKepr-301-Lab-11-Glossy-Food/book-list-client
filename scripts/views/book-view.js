'use strict'
console.log('entering book-view.js');
var app = app || {};
(function (module) {
  let bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(book => $('#booklist').append(book.toHtml()));
  }
  module.bookView = bookView;
})(app)

$(function () {
  console.log('IIFE working');
  app.Book.fetchAll(app.bookView.initIndexPage);
})