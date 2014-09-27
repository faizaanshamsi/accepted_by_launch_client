var socket = io.connect('http://localhost:3000');

// function logTweet(tweet) {
//   if ( tweet["extended_entities"] !== null && tweet["extended_entities"]["media"][0]["media_url"] !== null) {
//     console.log(
//       "User:", tweet["user"]["name"],
//       "(@" + tweet["user"]["screen_name"] + ")",
//       "says,", tweet["text"],
//       tweet["extended_entities"]["media"][0]["media_url"]
//     );
//   } else {
//     console.log(
//       "User:", tweet["user"]["name"],
//       "(@" + tweet["user"]["screen_name"] + ")",
//       "says,", tweet["text"]
//     );
//   }
// };

function constructListItem(tweet) {
  var user = tweet["user"]["name"];
  var text = tweet["text"];
  var result;
  if ( tweet["extended_entities"] !== undefined && tweet["extended_entities"]["media"][0]["media_url"] !== undefined )
    {
      var imageUrl = tweet["extended_entities"]["media"][0]["media_url"]
      var imageTag = "<img src=\"" + imageUrl + "\">"
      result = user + text + imageTag
    }
  else
    {
      result = user + text
    }
  return result;
}

function addTweetTextToList(tweet) {
  // var user = tweet["user"]["name"];
  // var text = tweet["text"];
  // var imageUrl = tweet["extended_entities"]["media"][0]["media_url"]
  // var imageTag = "<img src=\"" + imageUrl + "\">"
  //
  // var result = user + text + imageTag

  $('.tweets ul').append('<li>' + constructListItem(tweet) + '</li>');
};

socket.on('connect', function () {
  socket.on('acceptanceTweet', function(tweet) {
    addTweetTextToList(tweet);
    console.log(tweet);
  });
});

  //
  //
  //
  // if (tweet["extended_entities"]["media"][0]["media_url"]) {
  //   console.log("User:", tweet["user"]["name"], "(@" + tweet["user"]["screen_name"] + ")", "says,", tweet["text"],   tweet["extended_entities"]["media"][0]["media_url"] );
  // } else {
  //   console.log("User:", tweet["user"]["name"], "(@" + tweet["user"]["screen_name"] + ")", "says,", tweet["text"]);
  // }
