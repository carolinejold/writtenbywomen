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


  //iterate over results (map), then gender detect package, if statements, return the females as json
app.get('/api/articles', async (req, res) => {
  const data = await fetchData();
  // RESULTS & SOURCING THE ARRAY OF NAMES. refactor this
  const { results } = data.response; // WORKS
  const resultsWithTags = results.filter(result => 'tags' in result); // WORKS but returns some 'undefined' as part of array
  const filteredResultsWithTags = resultsWithTags.filter(result => result !== undefined)
  const arrayOfTagObjects = filteredResultsWithTags.map(result => result.tags[0]); // WORKS TO HERE
  const filteredArrayOfTagObjects = arrayOfTagObjects.filter(result => result !== undefined)
  const resultsWithName = filteredArrayOfTagObjects.filter(tag => 'webTitle' in tag);
  const arrayOfNames = resultsWithName.map(tag => tag.webTitle);
  
  // 1. apply gender detector to array of names
      // gender detection
      // const g = gender.detect('Holly'); // 'female'
      // a) iterate through array and apply gender.detect to each element in array
 // GETTING ARRAY OF FEMALE NAMES
      const arrayOfFirstNames = arrayOfNames.map(name => name.split(' ')[0]);
      const femaleNames = arrayOfFirstNames.filter(name => gender.detect(name) === 'female')
      
  // 2. then will have array of female names, femaleNames DONE
    console.log(filteredArrayOfTagObjects);
    const femaleObjs = filteredArrayOfTagObjects.filter(obj => femaleNames.includes(obj.webTitle.split(' ')[0]));
  console.log(femaleObjs)
  // 3. check if webTitle of results.tags[0].webTitle is equal to any of the female names
         // how to do this: if (femaleNames.includes('results.tags[0].webTitle')) {
         // return the results object with that name
        //  }
  // return results objects with FEMALE names in the array of TAGS under 'webTitle'
  res.json(femaleObjs);
  // TODO - have json file with array of unisex names which should be discluded?
});

const port = 5000;
app.listen(port, () => {
  console.log(`Caroline's Express server has started on port ${port}!!`)
})
