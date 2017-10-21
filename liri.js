// ---------------------- Packages & Global Variables --------
var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var T = new twitter(keys);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys);


var command = process.argv[2];
var input = process.argv[3];
var artist = process.argv[4];


//  --------------------- Process --------------------------
switch (command) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

// ---------------------- Functions -----------------------
function myTweets() {
    var params = {
        from: 'khloekardashian',
        count: 20
    }
    var arr = [];
    T.get('/search/tweets.json', params, function(error, tweets, response) {
        for (var i = 0; i < tweets.statuses.length; i++) {
            arr.push(tweets.statuses[i].text);
        };
        // var str = arr.toString();
        console.log(arr);

    });
};

function spotifyThisSong() {
    if (!input) {
        spotify.search({ type: 'track', query: 'The Sign', artist: "Ace of Base" }, function(err, data) {
            console.log(data.tracks);
            // console.log("Artist: " + );
            // console.log("Song Title: " + );
            // console.log("Preview Link: " + );
            // console.log("Album: " + );
        });
    };
    spotify.search({ type: 'track', query: input, artist: artist }, function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks);
        // console.log("Artist: " + );
        // console.log("Song Title: " + );
        // console.log("Preview Link: " + );
        // console.log("Album: " + );
    });

};

function movieThis() {

    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMBD Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country produced in: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors/Actresses: " + movie.Actors);
        }
    });

};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        console.log(dataArr);
    });
};