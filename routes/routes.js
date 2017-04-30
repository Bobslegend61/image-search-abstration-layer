// Importing neccessary modules
const express = require("express");
const path = require("path");
const searchEntry = require("../model/Model");

// Defining roues
const router = express.Router();

// imagesearch api
router.get("/imagesearch/:what(*)", (req, res, next) => {
  let searchTerm = req.params.what;
  let offset = req.query.offset || 0;
  searchEntry.searchImage(searchTerm, offset, (err, body) => {
    if(err){
      return res.json({
        error: err
      })
    }
    let dataArray = [];
    body.value.forEach(data => {
      dataArray.push({
        snippet: data.name,
        webSearchUrl: data.webSearchUrl,
        thumbnail: data.thumbnailUrl,
        content: data.contentUrl
      });
    });
    res.json(dataArray);
  });
});

// latest
router.get("/latest/imagesearch", (req, res, next) => {
  searchEntry.findLatest((err, data) => {
    if(err){
      return res.json({
        error: "Something went wrong, please check your connection and try again"
      });
    }

    res.json(data);
  });
});

module.exports = router;
