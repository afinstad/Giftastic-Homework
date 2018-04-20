var topics = ["Doug Funny", "Recess", "Pepper Ann", "Rugrats"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCartoonInfo() {
  var cartoon = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  cartoon + "&api_key=ePDSE2y9cv9VEc9YPNH3YTNY8VkKotHx";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the movie
    var gifDiv = $("<div class='gif'>");

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var rateDisplay = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gifDiv.append(rateDisplay);


    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    gifDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#cartoon-view").prepend(gifDiv);
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("cartoon-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-cartoon").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var cartoon = $("#cartoon-input").val().trim();

  // Adding movie from the textbox to our array
  topics.push(cartoon);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".cartoon-btn", displayCartoonInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();