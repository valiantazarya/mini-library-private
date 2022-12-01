const CONTROLLER = require("../controllers");

module.exports = (APP)=>{
  APP.route('/api/books')
    .get(CONTROLLER.booksController.getBookBySubjects);

  APP.route('/api/books/pickup_schedules')
    .post(CONTROLLER.booksController.getBookBySubjects);
};