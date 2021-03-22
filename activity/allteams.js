let request = require("request");
let cheerio = require("cheerio");
let players = require('./eachmatch.js');

function allMatchScores(url) {
    request(url, cb);
}

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        createTeam(html);
    }
}

function createTeam(html) {
    let selTool = cheerio.load(html);
    let allMatch = selTool('a[data-hover="Scorecard"]');
    for (let i = 0; i < allMatch.length; i++) {
        let url = selTool(allMatch[i]).attr("href");
        let completeUrl = "https://www.espncricinfo.com" + url;
        players.playerStats(completeUrl);
    }
}

module.exports = {
    allMatchScores: allMatchScores
}