const CONTROLLER = require("../controllers");

module.exports = (APP)=>{
  APP.route('/api/books')
    .get(CONTROLLER.booksController.getBookBySubjects);

  APP.route('/api/books/pickup-schedules')
    .post(CONTROLLER.booksController.addPickupSchedule);

  APP.route('/api/books/pickup-schedules')
    .get(CONTROLLER.booksController.getAllPickupSchedule);

  APP.route('/api/books/pickup-schedules/:id')
    .get(CONTROLLER.booksController.getPickupScheduleByID);
};