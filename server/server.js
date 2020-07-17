const express = require('express');
const fetch = require('node-fetch');
const gender = require('gender-detection');

const app = express();

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

// TODO - add error handlers
  //iterate over results (map), then gender detect package, if statements, return the females as json
app.get('/api/authors', async (req, res) => {
  const data = await fetchData();
  // RESULTS & SOURCING THE ARRAY OF NAMES. refactor this
  const { results } = data.response; // WORKS
  const filteredResultsWithTags = results.filter(x => 'tags' in x).filter(x => x !== undefined)
  const arrayOfTagObjects = filteredResultsWithTags.map(x => x.tags[0]); // WORKS TO HERE
  const filteredArrayOfTagObjects = arrayOfTagObjects.filter(x => x !== undefined)
  const resultsWithName = filteredArrayOfTagObjects.filter(x => 'webTitle' in x);
  const arrayOfNames = resultsWithName.map(x => x.webTitle);
  
  const arrayOfFirstNames = arrayOfNames.map(x => x.split(' ')[0]);
  const femaleNames = arrayOfFirstNames.filter(x => gender.detect(x) === 'female')
      
  // 2. then will have array of female names, femaleNames DONE
    const femaleObjs = filteredArrayOfTagObjects.filter(obj => femaleNames.includes(obj.webTitle.split(' ')[0]));

  // 3. check if webTitle of results.tags[0].webTitle is equal to any of the female names
         // how to do this: if (femaleNames.includes('results.tags[0].webTitle')) {
         // return the results object with that name
        //  }
  // return results objects with FEMALE names in the array of TAGS under 'webTitle'
  res.json(femaleObjs);
});


const port = 5000;
app.listen(port, () => {
  console.log(`Caroline's Express server has started on port ${port}!!`)
})
