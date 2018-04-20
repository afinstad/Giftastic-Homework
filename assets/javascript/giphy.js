// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// Initial array

var topics = ["Doug Funny", "Pepper Ann", "Rugrats", "Recess"];

// Event listener for all button elements
$("button").on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var cartoon = $(this).attr("data-cartoon");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=ePDSE2y9cv9VEc9YPNH3YTNY8VkKotHx";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;
            // Try using a loop that appends a button for each string in the array.
            // Looping through the array of characters 
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var gifDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var gifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                gifImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                gifDiv.append(p);
                gifDiv.append(gifImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
});
