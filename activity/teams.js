let request = require("request");
let cheerio = require("cheerio");
let createTeam = require('./allteams.js');

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

function cb(error, response, html) {
  if (error) {
    console.log(error);
  } else {
    //  console.log(html);
    loadResult(html);
  }
}



function loadResult(html){
    let selTool = cheerio.load(html);
    let iplResults = selTool('a[data-hover="View All Results"]');
    let resultLink = iplResults.attr("href");
    let completeUrl = "https://www.espncricinfo.com" + resultLink;
    // console.log(completeUrl);
    createTeam.allMatchScores(completeUrl);
}