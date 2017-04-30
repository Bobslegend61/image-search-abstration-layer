// Importing neccessary modules
const mongoose = require("mongoose");
const config = require("../config/config");
const Bing = require('node-bing-api')({ accKey: "ebc9633ffbe54c0b94ca10ced35e7bd2" });

// Connecting to database
mongoose.connect(config.database);

// Connection success
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

// Connection error
mongoose.connection.on("error", (err) => {
  console.log("error connecting to database "+ err);
});

// Creating schema
const searchSchema = mongoose.Schema({
  searchTerm: String,
  when: Date
});

// Defining model
let searchEntry = module.exports = mongoose.model("searchEntry", searchSchema);

module.exports.searchImage = (searchTerm, query, callback) => {
  searchEntry.find({searchTerm: searchTerm},(err, doc) => {
    if(err){
      return callback(err);
    }

    if (doc.length === 0){
      let data = {
        searchTerm: searchTerm,
        when: new Date()
      };
      let newEntry = new searchEntry(data);
      newEntry.save((err) => {
        if(err){
          return callback(err);
        }
      });
    }

    Bing.images(searchTerm, {
      top: 10,
      skip: query * 10
    }, (error, res, body) => {
      callback(null, body);
    });
  });
};

// latest
module.exports.findLatest = (callback) => {
  searchEntry.find({},
  {
    searchTerm: 1,
    when: 1,
    _id: 0
  },
  {
    sort: {
      when: -1
    },
    limit: 10
  }, callback);
};
