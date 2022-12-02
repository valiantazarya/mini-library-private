const booksController = require('../controllers/booksController')

describe('Test /books', () => {
  describe('Books check on /sync', () => {
    it('books should be okay', () => {
      const actualResult = booksController.getBookBySubjects();
      expect(actualResult).to.equal('OK');
    });
  });
});