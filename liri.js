require("dotenv").config();
var keys = require("./keys.js");
// required npm packages
var Spotify = require('node-spotify-api');
var axios = require('axios');
// var db = require('db');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

// console.log(process.argv);

var userInput = process.argv.splice(2);
console.log(userInput);
var liriCommand = userInput[0];
var searchTerms = userInput.splice(1).map(elem => elem.toLocaleLowerCase()).join('+');
if (liriCommand === "concert-this"){
    axios.get("https://rest.bandsintown.com/artists/" + searchTerms + "/events?app_id=codingbootcamp").then(function(response){
        console.log(response);
    })
}
console.log(searchTerms);