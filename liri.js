
    //Call in installed packages
    var twitter = require("twitter");
    var spotify = require("node-spotify-api");
    var request = require("request");
    var inquirer = require('inquirer');
    //This is used to require in the random file for the do-what it says option
    var fs = require("fs");
    //Pull in file where twitter and spotify keys are saved
    var appKeys = require("./keys.js");
  

   inquirer.prompt([
        {
            //Set of choice of things for user to do:
            type: "list",
            message: "Explore an app! Choose 1:",
            choices: [  "myTweets",
                        "spotify-this-song",
                        "movie-this",
                        "do-what-it-says"],
            name: "app",
            }
   ]).then(function(inquirerResponse){
        //Define what happens with each of the choices
        if(inquirerResponse.app === "myTweets"){
            console.log('You chose to see my tweets');
            //Call the function that will print my tweets to the console
            printTweets ();  
        } else if(inquirerResponse.app === "spotify-this-song"){
            console.log("You want to hear some music");
            //Set up another inquirer function for the user to input song info 
            inquirer.prompt([
                {
                    type:"input",
                    message: "choose a song, any song!",
                    name: "song"
                }
            ]).then(function(songResponse){
                var chosenSong = songResponse.song;
                //call spotify song function and input song variable
                console.log(chosenSong);
                printSongInfoFromSpotify(chosenSong);
            })
            
        } else if(inquirerResponse.app === "movie-this"){
            console.log("Get some cool movie info!");
            inquirer.prompt([
                {
                    type:"input",
                    message: "What movie would you like to know about?",
                    name: "movie"
                }
            ]).then(function(movieResponse){
                var chosenMovie = movieResponse.movie;
                //request call from omdb website
                console.log(chosenMovie);
                getSomeMovieInfo(chosenMovie);
            })
        } else if(inquirerResponse.app === "do-what-it-says"){
            // console.log("you are going to do something else")
            fs.readFile("random.txt", "utf8", function(error, data){
                if(err){
                   console.log("you are going to do something else");
                   //This will default spotify the song "I want it that way" 
                }
            })
        }
   }) //End of .then 

   //Functions for apps
   //TWITTER!!!!!!
   function printTweets() {
    //    console.log(appKeys.tKeys); //This works, we are calling the property  
       var client = new twitter(appKeys.tKeys);     
    //    console.log(client); //I am getting what I want HERE!!!
        var params = {
            screen_name: 'nicoleelfra',
            count: 20
        }
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                // console.log(tweets); //This works!! I am getting my tweets object
                for(i = 0; i < tweets.length; i++){
                    // console.log(tweets[i].text); //YAY!! This also works!!!
                    console.log(tweets[i].created_at.substring(0, 10) + " " + tweets[i].text);

                }
            }
        })
   }

    //SPOTIFY!!!!!!!
    function printSongInfoFromSpotify(chosenSong) {
            // console.log(appKeys.sKeys);
            var spotSong = new spotify(appKeys.sKeys);
            spotSong.search({
                    type: 'track',
                    query: chosenSong,
                    limit: 1
                }, 
                function(err, data) {
                    if (err) {
                    return console.log("Error is: " + err);
                    } else if(!err){
                        // console.log(JSON.stringify(data.tracks.items[0], null, 3));
                        console.log("Song artist " + data.tracks.items[0].album.artists[0].name);
                        console.log("Song name: " + data.tracks.items[0].name);
                        console.log("Album name: " + data.tracks.items[0].album.name);
                        console.log("Listen to the song here: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
                    }
                })     
            }

//OMDB!!!!!
function getSomeMovieInfo (chosenMovie) {
    request("http://www.omdbapi.com/?t=" + chosenMovie + "&y=&plot=short&apikey=40e9cece",
        function (error, response){
            console.log('error: ', error);
            console.log('statusCode: ', response && response.statusCode);
            // console.log(JSON.stringify(response, null, 3));
            console.log("Title: " + JSON.parse(response.body).Title);
            console.log("Year: " + JSON.parse(response.body).Year);
            console.log("Actors: " + JSON.parse(response.body).Actors);
            console.log("Plot: " + JSON.parse(response.body).Plot);
            console.log("IMDB: " + JSON.parse(response.body).Ratings[0].Value);
            console.log("Rotten Tomatoes: " + JSON.parse(response.body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(response.body).Country);
            console.log("Language: " + JSON.parse(response.body).Language);      
        });
    }