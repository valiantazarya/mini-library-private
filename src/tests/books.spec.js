// const { mocha, before } = require("mocha");
// const { chai, expect, should, assert } = require("chai");
const express = require('express');
const app = express();
const server = app.listen();
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');

const axios = require("axios");

const booksController = require('../controllers/booksController');

const API_URL = "http://localhost:8080";
var tempUUID = "";

describe("Test GET endpoint /api/books", () => {
  describe("GET all list of books by subject endpoint /api/books", () => {
    it("should return array of object representing list of books", async () => {
      const response = await axios.get(`${API_URL}/api/books?subject=love in literature&limit=25&offset=0`);
      expect(response.data.data).to.be.an("array");
      expect(response.status).to.equal(200);
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books because of wrong params", () => {
    it("should return error 400", async () => {
      await axios.get(`${API_URL}/api/books?subjet=love in literature&limit=25&offset=0`).then(() => {
        
      })
      .catch(err => {
        expect(err.response.status).to.equal(400);
      })
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books because of wrong URI", () => {
    it("should return error 404", async () => {
      await axios.get(`${API_URL}/api/user`).then(() => {
  
      })
      .catch(err => {
        expect(err.response.status).to.equal(404);
      })
    });
  });
});

describe("Test POST endpoint /api/books", () => {
  const payload = {
    "cover_id": 2239510,
    "key": "/works/OL1456989W",
    "title": "De hominis dignitate",
    "authors": [
      {
        "key": "/authors/OL153890A",
        "name": "Giovanni Pico della Mirandola"
      },
      {
        "key": "/authors/OL2477978A",
        "name": "Patricia Mari-Fabre"
      }
    ],
    "edition_number": 15,
    "pickup_date": new Date
  };
  describe("POST a new pickup schedule endpoint /api/books/pickup-schedule", () => {
    it("should return an object representing the pickup schedule", async () => {
      const response = await axios.post(`${API_URL}/api/books/pickup-schedules`, payload);

      tempUUID = response.data.data.uuid;

      expect(response.status).to.be.equal(201);
      expect(response.data.data).to.be.an("object");
      expect(response.data.data).to.haveOwnProperty("uuid");
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books because of wrong params", () => {
    it("should return error 400", async () => {
      await axios.post(`${API_URL}/api/books/pickup-schedules`, payload).then(() => {
        
      })
      .catch(err => {
        expect(err.response.status).to.equal(400);
      })
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books because of wrong URI", () => {
    it("should return error 404", async () => {
      await axios.post(`${API_URL}/api/books/pickup-time`, payload).then(() => {

      })
      .catch(err => {
        expect(err.response.status).to.equal(404);
      })
    });
  });
});

describe("Test GET endpoint /api/books/pickup-schedules", () => {
  describe("GET all list of pickup schedule endpoint /api/books/pickup-schedules", () => {
    it("should return array of object representing list of book information and pickup schedule", async () => {
      const response = await axios.get(`${API_URL}/api/books/pickup-schedules`);
      expect(response.status).to.equal(200);
      expect(response.data.data).to.be.an("array");
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books/pickup-schedules because of wrong params", () => {
    it("should return error 400", async () => {
      await axios.get(`${API_URL}/api/books/pickup-schedules?time`).then(() => {
        
      })
      .catch(err => {
        expect(err.response.status).to.equal(400);
      })
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books/pickup-schedules because of wrong URI", () => {
    it("should return error 404", async () => {
      await axios.get(`${API_URL}/api/books/pickup-schedles`).then(() => {
  
      })
      .catch(err => {
        expect(err.response.status).to.equal(404);
      })
    });
  });
});

describe("Test GET endpoint /api/books/pickup-schedules:uuid", () => {
  describe("GET all list of pickup schedule endpoint /api/pickup-schedules/:uuid", () => {
    it("should return array of object representing list of book information and pickup schedule", async () => {
      const response = await axios.get(`${API_URL}/api/books/pickup-schedules/${tempUUID}`); //get the uuid first
      expect(response.status).to.equal(200);
      expect(response.data.data).to.be.an("object");
      expect(response.data.data).to.haveOwnProperty("uuid");
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books/pickup-schedules:uuid because of wrong params", () => {
    it("should return error 400", async () => {
      await axios.get(`${API_URL}/api/books/pickup-schedules/uuid:${tempUUID}`).then(() => {
        
      })
      .catch(err => {
        expect(err.response.status).to.equal(400);
      })
    });
  });

  describe("Failed to GET list of books by subjects endpoint /api/books/pickup-schedules:uuid because of wrong URI", () => {
    it("should return error 404", async () => {
      await axios.get(`${API_URL}/api/books/pickup-schedules/uuid`).then(() => {

      })
      .catch(err => {
        expect(err.response.status).to.equal(404);
      })
    });
  });
});