const express = require('express');
const fetch = require('node-fetch');
const gender = require('gender-detection');

const app = express();


// gender detection
// let g;
// g = gender.detect('Holly'); // 'female'

async function fetchData() {
  let response = await fetch('https://content.guardianapis.com/search?page-size=200&q=(computing%20OR%20technology)&show-tags=contributor&api-key=e462c367-e13c-41c8-a222-23587ab9acc4')
  let data = await response.json();
  return data;
}

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/articles', async (req, res) => {
  const data = await fetchData();
  // iterate over results to get each article, then apply tags[0].firstName to each article
  // console.log(data.response.results[0].tags[0].firstName);
  //iterate over results (map), then gender detect package, if statements, return the females as json
  res.json(data);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Caroline's Express server has started on port ${port}!!`)
})
