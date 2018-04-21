var topics = ["Doug Funny", "Recess", "Pepper Ann", "Rugrats"];

// displayCartoonGifs function re-renders the HTML to display the appropriate content
function displayCartoonGifs() {
  var cartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon + "&limit=10&api_key=ePDSE2y9cv9VEc9YPNH3YTNY8VkKotHx";
  // Creating an AJAX call for the specific button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL);
    console.log(response.data);

    var results = response.data;
    // Try using a loop that appends a button for each string in the array.
    // Looping through the array of characters 
    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>");

        // Storing the rating data
        var rating = results[i].rating;

      }// Creating a div to hold the cartoon
      var gifDiv = $("<div class='gif'>");
      // Creating an element to hold the image
      var image = $("<img>");
      //makes image animated or still
      var defaultAnimatedSrc = results[i].images.fixed_height.url;
      var staticSrc = results[i].images.fixed_height_still.url;

      image.addClass("gifImage");
      image.attr('title', "Rating: " + results[i].rating);
      image.attr("data-state", "still");
      image.attr("src", staticSrc);
      image.attr("data-still", staticSrc);
      image.attr("data-animate", defaultAnimatedSrc);

      // Creating an element to have the rating displayed
      var rateDisplay = $("<p>").text("Rating: " + rating);
      // Displaying the rating -- Need this for display of gifs
      gifDiv.append(rateDisplay);
      gifDiv.append(image)
      gifDiv.append(p)

      $("#seeGif").prepend(gifDiv);
      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
}
renderButtons();

//Click event on button with id of "show" executes displayNetflixShow function
$(document).on("click", "#buttons-view", displayCartoonGifs);

//Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
$(document).on("click", ".gifImage", pausePlayGifs);

//Function makes gifs still or animated from their current state. 
function pausePlayGifs() {
  //state is the current state that the image is in while still and animate change the image
   var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
}
}
//function for animating GIFS****
$(".document").on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// function for displaying show gifs
$(document).on("click", ".cartoon", displayCartoonGifs);

// initially calls the makeButtons function
renderButtons();
// Function for displaying cartoon info
function renderButtons() {

  // Deleting the cartoons prior to adding new cartoons
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of cartoons
  for (var i = 0; i < topics.length; i++) {


    var a = $("<button>");
  
    a.addClass("cartoon");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);

  }
}

$("#add-cartoon").on("click", function (event) {
  // This line grabs the input from the textbox
  var cartoon = $("#cartoon-input").val().trim();
  // Adding cartoon from the textbox to our array
  topics.push(cartoon);
  // Calling renderButtons which handles the processing of our topics array
  renderButtons();

})






