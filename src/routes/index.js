const controllers = require("../controllers");

module.exports = function(app) {
  app.route('/api/books')
    .get(controllers.bookCtrl.getBookBySubjects);

  app.route('/api/books/pickup-schedules')
    .post(controllers.bookCtrl.addPickupSchedule);

  app.route('/api/books/pickup-schedules')
    .get(controllers.bookCtrl.getAllPickupSchedule);

  app.route('/api/books/pickup-schedules/:uuid')
    .get(controllers.bookCtrl.getPickupScheduleByID);
}