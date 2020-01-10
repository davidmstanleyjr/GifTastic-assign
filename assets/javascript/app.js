var topics = ["Daenerys Targaryen", "Jon Snow", "Jaime Lannister", "Cersei Lannister", "The Hound",
    "Arya Stark", "Night King", "Melisandre", "Joffrey Baratheon", "Tyrion Lannister",];

var characterSelected = "";
var newCharacter;


$("#newTopic").on("click", function () {
var button = $("<button>");
button.text($("#userTopic").val())
button.addClass("gotButton")
$("#gotButtons").append(button);
attachEvent();
})



makeButtons();
function makeButtons() {
    $("#gotButtons").empty();

    for (v in topics) {
        var gotButton = $("<button>");
        gotButton.text(topics[v]);
        gotButton.addClass("gotButton")
        $("#gotButtons").append(gotButton);
    }

  attachEvent(); 
}


function attachEvent () {
    $(".gotButton").on("click", function () {
        $("#characters").empty();

    
        characterSelected = $(this).text();
        var url = "https://api.giphy.com/v1/gifs/search";
        url += '?' + $.param({
            'q': characterSelected,
            'api_key': "rNdXDLNYthIjN88XMIVsVMmBK57fR2jJ",
            "limit": 10
            
            

        });

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(results);
            $.each(results, function () {
                var item = this;
                var stillImageUrl = item.images.downsized_still.url;
                console.log(stillImageUrl);
                var characterDiv = $("<div>")
                characterDiv.addClass("col-sm-4")

                

                var characterCard = $("<div>")
                characterCard.addClass("card")

                var characterImage = $("<img>").attr("src", stillImageUrl);
                characterImage.attr("data-still", item.images.original_still.url)
                characterImage.attr("data-animate", item.images.original.url)
                characterImage.attr("data-state", "still")
                characterImage.addClass("card-img-top");
                characterCard.append(characterImage);

                
                var characterRating = $("<p>");
                characterRating.addClass("rating");
                characterRating.append("rating: " + item.rating);
                characterCard.append(characterRating);
                
                
                
                

                characterCard.on("click", function () {
                    console.log("clicked");
                    if (characterImage.attr("data-state") === "still"){
                        characterImage.attr("src", item.images.preview_gif.url)
                        characterImage.attr("data-state", "animated")
                    }
                   

                    else{
                        
                        characterImage.attr("src", stillImageUrl);
                        characterImage.attr("data-state", "still")
                    }
                })

                $("#characters").append(characterCard);
                
            });

            

        });
    })
}