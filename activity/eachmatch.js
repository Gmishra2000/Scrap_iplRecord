let request = require("request");
let cheerio = require("cheerio");

let fs = require("fs");
let path = require("path");


function fileCreate(teamName) {
    
    return fs.existsSync(teamName);
}
function createFolder(teamName) {
    fs.mkdirSync(teamName);
}

function playerStats(url){
    request(url, cb);
}

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        listStat(html);
    }
}


function listStat(html){
    let selTool = cheerio.load(html);
    let elems = selTool(".Collapsible");
    let venue_date = selTool(".match-info.match-info-MATCH .description")
    let venue = venue_date.text().split(",");
    let vd = venue[1];
    let date = venue[2];

    let result = selTool(".match-info.match-info-MATCH .status-text span");
    let resultOfmatch = result.text();
  
    for(let i =0;i< elems.length;i++){
        let eachInning = selTool(elems[i]);
        let teamName = eachInning.find("h5").text();
        
        let stringArr = teamName.split("INNINGS")
        teamName = stringArr[0].trim();
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("TeamName: ", teamName);
        let playerRows = eachInning.find(".table.batsman tbody tr");
        for (let j = 0; j < playerRows.length; j++) {
            
            let cols = selTool(playerRows[j]).find("td");
            let isAllowed = selTool(cols[0]).hasClass("batsman-cell");
            if (isAllowed) {
                
                let playerName = selTool(cols[0]).text().trim();
                let runs = selTool(cols[2]).text().trim();
                let balls = selTool(cols[3]).text().trim();
                let fours = selTool(cols[5]).text().trim();
                let sixes = selTool(cols[6]).text().trim();
                let sr = selTool(cols[7]).text().trim();
                 
                playerReport(playerName, runs, balls, sixes, fours, sr, teamName, vd, date, resultOfmatch);
            }
        }
    }
    console.log("`````````````````````````");
}

function playerReport(playerName,runs,balls,sixes,fours,sr,teamName,venue,date,resultOfmatch) {
    
    let playerObj = {
        playerName: playerName,
        runs: runs,
        balls: balls, sixes,
        fours: fours,
        sr: sr, teamName,venue,date,
        resultOfmatch
    }
    
    let dirExist = fileCreate(teamName);
    if (dirExist) {

    } else {
        createFolder(teamName);
    }
    
    let playerFileName = path.join(__dirname, teamName, playerName + ".json");
     
    let fileExist = fileCreate(playerFileName);
    let playerScore = [];
    if (fileExist) {
        
        playerScore.push(playerObj);
        
    } else {
        
        playerScore.push(playerObj);
        
    }
    console.table(playerScore);
}




module.exports = {
    playerStats: playerStats
}