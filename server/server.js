const express = require('express');
const fetch = require('node-fetch');
const gender = require('gender-detection');

const app = express();

// FETCHING DATA
async function fetchData() {
  let response = await fetch('https://content.guardianapis.com/search?page-size=200&q=(computing%20OR%20technology)&show-tags=contributor&api-key=e462c367-e13c-41c8-a222-23587ab9acc4')
  let data = await response.json();
  return data;
}

// MIDDLEWARE 
// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// ROUTING
app.get('/api/authors', async (req, res) => {
  const data = await fetchData();
  const { results } = data.response;

  const tagObjs =
    results.filter(x => 'tags' in x)
      .filter(x => x !== undefined)
      .map(x => x.tags[0]) //arrayOfTagObjects
      .filter(x => x !== undefined);

  const femaleNames =
    tagObjs.filter(x => 'webTitle' in x)
      .map(x => x.webTitle)
      .map(x => x.split(' ')[0])
      .filter(x => gender.detect(x) === 'female'); // using gender detection package

  const femaleObjs =
    tagObjs.filter(x => femaleNames.includes(x.webTitle.split(' ')[0]));

  res.json(femaleObjs);
});


// 404 error handling middleware
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

// PORT
const port = 5000;
app.listen(port, () => {
  console.log(`Caroline's Express server has started on port ${port}!!`)
})
