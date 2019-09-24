require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var argument = process.argv[2];
var stringArgv = process.argv;
var userConcert = "";
var userSong = "";
var userMovie = "";

for (var i = 3; i < stringArgv.length; i++) {
  if (i > 3 && i < stringArgv.length) {
    userConcert = userConcert + " " + stringArgv[i];
    userSong = userSong + " " + stringArgv[i];
    userMovie = userMovie + "+" + stringArgv[i];
  } else {
    userConcert += stringArgv[i];
    userSong += stringArgv[i];
    userMovie += stringArgv[i];
  }
}
switch (argument) {
  case "concert-this":
    concertThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "hi":
    Hello();
    break;
  case "help":
    Hello();
    break;
  default:
    console.log(err);
    break;
}

function Hello() {
  console.log("[Concert-This]-[Movie-This]");
}
function concertThis() {
  if (userConcert === "") {
    userConcert = "ChrisBrown";
  }
  var getBiT =
    "https://rest.bandsintown.com/artists/" +
    userConcert +
    "/events?app_id=codingbootcamp";
  axios.get(getBiT).then(function(response, err) {
    if (response) {
      var infoBiT = response.data[0];
      var venueName = "Venue Name: " + infoBiT.venue.name;
      var venueLocation = "Venue Location: " + infoBiT.venue.city;
      var playTime = infoBiT.datetime;
      var removeTime = playTime.split("T");
      var venueDate =
        "Venue Date: " + moment(removeTime[0]).format("MM/DD/YYYY");
      var venueRecord = venueName + "," + venueLocation + "," + venueDate;
      console.log(venueName);
      console.log(venueLocation);
      console.log(venueDate);
    } else {
      console.log(err);
    }
  });
}

function movieThis() {
  if (userMovie === "") {
    userMovie = "The+Notebook";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);
  axios.get(queryUrl).then(function(response, err) {
    console.log(err ? "Errors occurred: " + err : "");
    if (response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Rated: " + response.data.Rated);
      console.log("Actors: " + response.data.Actors);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Description: " + response.data.Plot);
    } else {
      console.log(err);
    }
  });
}
