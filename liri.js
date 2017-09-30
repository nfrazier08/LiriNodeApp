
    //Call in installed packages
    var twitter = require("twitter");
    var spotify = require("node-spotify-api");
    var requestAPI = require("request");
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
            // printSongInfoFromSpotify();
        } else if(inquirerResponse.app === "movie-this"){
            console.log("Get some cool movie info!");
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

//    printTweets(); //THIS WORKS!!! YAYAYAYAYAY! 


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
                   console.log(data);
                   console.log("artist " + data.tracks.items[0].name);
                //    console.log("song name " + data.tracks.items[0].)
                //    console.log("link to song " + data.tracks.items[0].uri)
                //    console.log("album " + data.tracks.items[0].)
                }
            })     
        }

//    printSongInfoFromSpotify();
   //Artist
   //Song Name
   //Preview Link to song
   //Album