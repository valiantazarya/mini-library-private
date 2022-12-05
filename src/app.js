const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

require('./routes')(app);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
}