var socket = io.connect('http://localhost:3000');

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
  $('.tweets ul').append('<li>' + constructListItem(tweet) + '</li>');
};

socket.on('connect', function () {
  socket.on('acceptanceTweet', function(tweet) {
    addTweetTextToList(tweet);
    console.log(tweet);
  });
});
