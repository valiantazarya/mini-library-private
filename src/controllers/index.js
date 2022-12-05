// const axios = require('axios');
const NodeCache = require("node-cache");
const { randomUUID } = require('crypto');
const CustomResp = require('./response');
const openLibrary = require('../clients/openlibrary');
const PickupSchedule = require('../models/local/PickupSchedule')

let bookCtrl = {};

const cache = new NodeCache();

bookCtrl.getBookBySubjects = async (REQUEST, RESPONSE) => {
  try {
    const param = REQUEST.query;

    if(!param.subject) return RESPONSE.status(400).json(CustomResp(400, "Failed to process the request because of malformed request syntax or invalid request message framing", null));

    let res = await openLibrary.clientGetBooksBySubject(REQUEST)
    return RESPONSE.json(CustomResp(200, null, res));
  }
  catch(err) {
    return RESPONSE.json(CustomResp(err.status, err.message, null));
  }
};

bookCtrl.addPickupSchedule = async (REQUEST, RESPONSE) => {
  try {
    const body = REQUEST.body;

    Object.values(body).forEach(val => {
      if(!val) return RESPONSE.status(400).json(CustomResp(400, "Failed to process the request because of malformed request syntax or invalid request message framing", null));
    })

    const genUUID = randomUUID();
    const pickupSchedule = new PickupSchedule();
    pickupSchedule.uuid = genUUID;
    pickupSchedule.cover_id = body.cover_id;
    pickupSchedule.key = body.key;
    pickupSchedule.title = body.title;
    pickupSchedule.authors = body.authors;
    pickupSchedule.edition_number = body.edition_number;
    pickupSchedule.pickup_date = body.pickup_date;
    pickupSchedule.return_date = null;

    cache.set(genUUID, pickupSchedule);
    return RESPONSE.status(201).json(CustomResp(201, null, pickupSchedule));
  }
  catch (err) {
    return RESPONSE.json(CustomResp(err.status, err.message, null));
  }
};

bookCtrl.getAllPickupSchedule = async (REQUEST, RESPONSE) => {
  try {
    if (cache.getStats().keys) {
      const allKeys = cache.keys();
      let newData = [];

      allKeys.forEach(key => {
        let pickupSchedules = new PickupSchedule();
        pickupSchedules.uuid = cache.get(key).uuid;
        pickupSchedules.cover_id = cache.get(key).uuid.cover_id;
        pickupSchedules.key = cache.get(key).key;
        pickupSchedules.title = cache.get(key).title;
        pickupSchedules.authors = cache.get(key).authors;
        pickupSchedules.edition_number = cache.get(key).edition_number;
        pickupSchedules.pickup_date = cache.get(key).pickup_date;
        pickupSchedules.return_date = cache.get(key).return_date;

        newData.push(pickupSchedules);
      })
      return RESPONSE.json(CustomResp(200, null, newData));
    }
    return RESPONSE.status(200).json(CustomResp(200, "No data found", []));
  }
  catch (err) {
    return RESPONSE.json(CustomResp(err.status, err.message, null));
  }
}

bookCtrl.getPickupScheduleByID = async (REQUEST, RESPONSE) => {
  try {
    const params = REQUEST.params;
    if (cache.has(params.uuid)) {
      let pickupSchedule = new PickupSchedule();
      pickupSchedule.uuid = cache.get(params.uuid).uuid;
      pickupSchedule.cover_id = cache.get(params.uuid).uuid.cover_id;
      pickupSchedule.key = cache.get(params.uuid).key;
      pickupSchedule.title = cache.get(params.uuid).title;
      pickupSchedule.authors = cache.get(params.uuid).authors;
      pickupSchedule.edition_number = cache.get(params.uuid).edition_number;
      pickupSchedule.pickup_date = cache.get(params.uuid).pickup_date;
      pickupSchedule.return_date = cache.get(params.uuid).return_date;

      return RESPONSE.json(CustomResp(200, null, pickupSchedule));
    }
    return RESPONSE.status(200).json(CustomResp(200, "No data found", []));
  }
  catch (err) {
    return RESPONSE.json(CustomResp(err.status, err.message, null));
  }
}

module.exports = {
  bookCtrl : bookCtrl,
};