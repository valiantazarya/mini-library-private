const axios = require('axios');
const randomUUID = require('crypto');

let booksController = {};

booksController.getBookBySubjects = async (REQUEST, RESPONSE) => {
  const param = REQUEST.query;
  await axios.get(`https://openlibrary.org/subjects/${param.subject}.json?limit=${param.subject}&offset=${param.offset}`)
    .then(res => {
      const data = res.data;
      let newData = []

      data.works.forEach(row => {
        newData.push({
          id: row.cover_id,
          key: row.key,
          title: row.title,
          authors: row.authors,
          editionNumber: row.edition_count 
        })
      });
      return RESPONSE.jsonp(newData);
    })
    .catch(err => { 
      return RESPONSE.jsonp(err);
    })
};

booksController.addPickupSchedule = async (REQUEST, RESPONSE) => {
  try {
    const body = REQUEST.body;

    const genUUID = randomUUID();
    const data = [{
      uuid: genUUID,
      id: body.cover_id,
      key: body.key,
      title: body.title,
      authors: body.authors,
      subject: body.subject,
      pickupDate: body.pickupDate,
      returnDate: null
    }];
    cache.set(data.id, data);
    return RESPONSE.status(200).json("pickup request success");
  }
  catch (err) {
    return RESPONSE.sendStatus(err.status);
  }
};

module.exports = booksController;