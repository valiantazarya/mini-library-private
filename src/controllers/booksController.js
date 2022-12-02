const axios = require('axios');
const NodeCache = require("node-cache");
const { randomUUID } = require('crypto');

let booksController = {};
const cache = new NodeCache();

booksController.getBookBySubjects = async (REQUEST, RESPONSE) => {
  const param = REQUEST.query;
  const cleanedSubjects = param.subject.replace(/[^\w ]/g, '');
  await axios.get(`https://openlibrary.org/subjects/${cleanedSubjects}.json?limit=${param.limit}&offset=${param.offset}`)
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
    const isBadRequest = false;

    const respData = {
      status: "success",
      message: "Successfully added pickup schedule"
    }

    const genUUID = randomUUID();
    const data = {
      uuid: genUUID,
      id: body.cover_id,
      key: body.key,
      title: body.title,
      authors: body.authors,
      editionNumber: body.edition_number,
      pickupDate: body.pickup_date,
    };

    Object.values(data).forEach(val => {
      if(!val) return RESPONSE.status(400).json({ errorMessage: "Bad request" });
    })

    data.returnDate = null;

    cache.set(genUUID, data);
    return RESPONSE.status(201).json(respData);
  }
  catch (err) {
    return RESPONSE.jsonp(err);
  }
};

booksController.getAllPickupSchedule = async (REQUEST, RESPONSE) => {
  try {
    if (cache) {
      const allKeys = cache.keys();
      let newData = [];

      allKeys.forEach(key => {
        newData.push(
          cache.get(key)
        );
      })
      return RESPONSE.jsonp(newData);
    }
  }
  catch (err) {
    return RESPONSE.jsonp(err);
  }
}

booksController.getPickupScheduleByID = async (REQUEST, RESPONSE) => {
  try {
    const params = REQUEST.params;


    if (cache.has(params.id)) {
      return RESPONSE.jsonp(cache.get(params.id));
    }
    return RESPONSE.status(200).json("data not found");
  }
  catch (err) {
    return RESPONSE.jsonp(err);
  }
}

module.exports = booksController;