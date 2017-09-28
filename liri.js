
    //Call in installed packages
    var twitPackage = require("twitter");
    var spotifyAPI = require("node-spotify-api");
    var requestAPI = require("request");
    
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

    // T.get('statuses/user_timeline', params, function(error, tweets, response) {
    //   if (!error) {
    //     console.log(tweets);
    //   }
    // });

    T.get('statuses/user_timeline', params, function(error, tweets, response){
        // if (!error){
        console.log(tweets);
        // console.log(tweets[0].text); //This works, but for only one of the tweets
        //Create a for loop 
        for (var i=0; i < response.length; i++){
            for (var text in tweets[i]) {
                console.log(tweet);
            }
        }
    })
        // }
    // })
    
