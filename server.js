const express = require("express");
//const logger = require("morgan");
const mongoose = require("mongoose");
//const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3001;

// const {
//   Note
// } = require('./models');

// app.use(logger("dev"));

// app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget-tracker-pwa", {
useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

// routes
app.use(require("./routes/api.js"));

app.post('/api/submit', ({
  body
}, res) => {
  Note.create(body)
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/api/all', (req, res) => {
  Note.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
