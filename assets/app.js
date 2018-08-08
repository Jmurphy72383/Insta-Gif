console.log("Connected!");

//API Key = 8RvaclhAOyLbFpVlnJ3nE4gtZgClv0uy

var searchButtons = ["Michael Myers", "Jason Vorhees", "Freddy Krueger", "Leatherface", "Kenny Powers", "Michael Scott", "Larry David", "Seinfeld", "Funny Cats"]

buttonGenerator();

$("input[type='text']").keypress(function(event) {
    if(event.which === 13) {
        var searchText = $(this).val();
        searchButtons.push(searchText);
        var newBtn = $("<button>");
        newBtn.text(searchText);
        newBtn.attr("id", searchText);
        $("#buttons").append(newBtn);
        $(this).val("");
        update();
    }
})

$("button").on("click", function() {
    var topic = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=8RvaclhAOyLbFpVlnJ3nE4gtZgClv0uy&limit=10";

    $.ajax({
        method: "GET",
        url: queryURL
    })
    .then(function(response) {
        console.log(response);
        for(var i = 0; i < response.data.length; i++) {
            var gifURL = response.data[i].images.original_still.url;
            var gifAction = response.data[i].images.original.url;
            var gifRating = response.data[i].rating;
            var newDiv = $("<div>");
            newDiv.attr("id", "gifDiv");
            var gifRat = $("<p>");
            gifRat.text("Rating: " + gifRating);
            var gifIMG = $("<img>");
            gifIMG.attr("src", gifURL);
            gifIMG.attr("class", "gif");
            gifIMG.attr("data-still", gifURL);
            gifIMG.attr("data-animate", gifAction);
            gifIMG.attr("data-state", "still");
             $("#images").prepend(newDiv);
             $("#gifDiv").prepend(gifRat);
             $("#gifDiv").prepend(gifIMG);
             $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        }
    })
})

function buttonGenerator() {
    for(var i = 0; i < searchButtons.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(searchButtons[i]);
        newBtn.attr("id", searchButtons[i])
        $("#buttons").append(newBtn);
    }
}

function update() {
    $("button").on("click", function() {
        var topic = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=8RvaclhAOyLbFpVlnJ3nE4gtZgClv0uy&limit=10";
    
        $.ajax({
            method: "GET",
            url: queryURL
        })
        .then(function(response) {
            console.log(response);
            for(var i = 0; i < response.data.length; i++) {
                var gifURL = response.data[i].images.original_still.url;
                var gifAction = response.data[i].images.original.url;
                var gifRating = response.data[i].rating;
                var newDiv = $("<div>");
                newDiv.attr("id", "gifDiv");
                var gifRat = $("<p>");
                gifRat.text("Rating: " + gifRating);
                var gifIMG = $("<img>");
                gifIMG.attr("src", gifURL);
                gifIMG.attr("class", "gif");
                gifIMG.attr("data-still", gifURL);
                gifIMG.attr("data-animate", gifAction);
                gifIMG.attr("data-state", "still");
                 $("#images").prepend(newDiv);
                 $("#gifDiv").prepend(gifRat);
                 $("#gifDiv").prepend(gifIMG);
                 $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
            }
            
        })
    })
}
