const axios = require("axios");
const Book = require("../models/openlibrary/book")

let openLibrary = {};

openLibrary.clientGetBooksBySubject = async request => {
  const param = request.query;
  const cleanedSubjects = param.subject.replace(/[^\w ]/g, '');
  var newFmtData = [];

  await axios.get(`https://openlibrary.org/subjects/${cleanedSubjects}.json?limit=${param.limit}&offset=${param.offset}`)
    .then((res) => {
      res.data.works.forEach(row => {
        books = new Book();
        books.cover_id = row.cover_id,
        books.key = row.key,
        books.title = row.title,
        books.authors = row.authors,
        books.edition_number = row.edition_count

        newFmtData.push(books)
      });
    })
    .catch(err => {
      return err;
    });
    
  return newFmtData;
}

module.exports = openLibrary;