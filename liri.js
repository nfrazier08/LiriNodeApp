
    //Call in installed packages
    var twitPackage = require("twitter");
    var spotifyPackage = require("node-spotify-api");
    var requestAPI = require("request");
    var inquirer = require('inquirer');
  
    var command = process.argv[2];
    var userChoice = process.argv[3];


    //TWITTER!!!!!!
    //Import keys from the keys.js
    var twitterConfig = require("./keys.js");

    //New twitter variable
    // Object of twitPackage that we can call functions inside
    var T = new twitPackage(twitterConfig)

    var params = {
        screen_name: 'nfrazierDevelop',
        // screen_name: 'nodejs',
        count: 20,
    };

    //SPOTIFY!!!!!!!
    // var spotifyConfig = require("./keys");

    // var S = new spotifyPackage(spotifyConfig);
    
    if(command === "myTweets"){
        T.get('statuses/user_timeline', params, function(error, tweets, response){
            // if (!error){
            // console.log(tweets); //This works, but for only one of the tweets
            // console.log(tweets[0].text)
            for(var i = 0; i <= tweets.length; i++) {
                console.log(tweets[i].text)
            }
                
        })
    } 

    // if(command === "spotify-this-song"){
    //     S.search({ type: 'track', query: userChoice}, function(err, data) {
    //         if (err) {
    //           return console.log('Error occurred: ' + err);
    //         }
           
    //       console.log(JSON.stringify(data.tracks.items[0], null,2)); 
    //       });
    // }
   
      
