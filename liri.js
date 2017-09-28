
    //Call in installed packages
    var twitPackage = require("twitter");
    var spotifyAPI = require("node-spotify-api");
    var requestAPI = require("request");
    var inquirer = require('inquirer');
  
    var command = process.argv[2];
    var userChoice = process.argv[3];

    //TWITTER!!!!!!
    //Import keys from the keys.js
    var twitterConfig = require("./keys.js");

    //New twitter variable
    //Object of twitPackage that we can call functions inside
    var T = new twitPackage(twitterConfig)

    var params = {
        screen_name: 'nfrazierDevelop',
        // screen_name: 'nodejs',
        count: 20,
    };

    //SPOTIFY!!!!!!!
    var spotify = new Spotify({
     id: '14667e30ccc945ffaec23fbeca690091',
     secret: '1cd9b6f86ff147529b8a82a4a66b0568'
    });
    
    if(command === "myTweets"){
        T.get('statuses/user_timeline', params, function(error, tweets, response){
            // if (!error){
            // console.log(text);
            console.log(tweets[0].text); //This works, but for only one of the tweets
            //Create a for loop 
            // for (var i=0; i < response.length; i++){
            //     console.log(response)
            //     for (var text in response[i]) {
            //        console.log("This is text " + text)
            //     }
            // }
        })
    } 

    if(command === "spotify-this-song"){
        spotify.search({ type: 'track', query: userChoice }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data); 
          });
    }
   
      
