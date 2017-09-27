//Write code to grab the data from keys.js
    //And store it in a variable
    //'require' is the keywork to import modules
    var myTwitterKeys = require("./keys.js");
    console.log(myTwitterKeys.consumer_key);

 
    var command = process.argv[2];
    // // var chosenItem = process.argv[3];

    // //Call in installed packages
    // var twitter = require("twitter");
    // var spotifyAPI = require("node-spotify-api");
    // var requestAPI = require("request");    

//     if(command === "myTweets"){
//         var params = {screen_name: 'nfrazierDevelops', count: 20};
//         console.log(params.screen_name);
//         myTwitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error) {
//             console.log(tweets);
//             console.log("am i getting something?");
//         }
//     });
// }
