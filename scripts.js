$( document ).ready(function() {
    console.log( "ready!" );
    // searchTowns();
});



searchUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=";
console.log(searchUrl);


//search towns on enter
$(document).on('keypress',function(e) {
if(e.which == 13) {
    searchTowns();
    console.log("searching towns...");
    $('.layoutContainer').addClass('layout2');
}
});

//Search for towns from users input
function searchTowns(){
  $('#results').empty();
  document.getElementById("search");{
    var inputOriginal = document.getElementById("input").value;
    var input = inputOriginal.replace(/\s+/g, '');
    if (input.length > 4){
      myurl = searchUrl + input;
      $('.town').empty();
    }
  }

  //add class to banner after search to change layout

  $('#search').click(function() {
  $('.layoutContainer').addClass('layout2');
});


  // ajax call to retrieve yelp data
  $.ajax({
    url: myurl,
    headers: {
      'Authorization':'Bearer CCKV4wgLkAdMcSF-fnfJIVrXq94faHt796mOwJnxPdQ9o0kCQxtKXbQZPCb6neCoTZ2IUqj0fBcNExaTMz_YNucySmaaCIk0hPIC1q9jdxz9W_BUbHmV9PEbi_I8XHYx',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      // Grab the results from the API JSON return
      var totalresults = data.total;
      console.log(totalresults);
      // If our results are greater than 0, continue
      if (totalresults > 0){
        console.log("running total results" + myurl);
        // Display a header on the page with the number of results
        // $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
        // Itirate through the JSON array of 'businesses' which was returned by the API
        $.each(data.businesses, function(i, item) {
          // Store each business's object in a variable
          var id = item.id;
          var alias = item.alias;
          var phone = item.display_phone;
          var image = item.image_url;
          var name = item.name;
          var rating = item.rating;
          var reviewcount = item.review_count;
          var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          // Append our result into our page
          $('#results').append('<div class="jaunt" id="' + id + '"">' + name + '<img src="' + image + '" style="width:200px;height:150px;"><br> <b></b>  <br>' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>' + phone + '<br></div>');
        });
        var firstDataState = data.businesses[0].location.state;
        var firstDataCity = data.businesses[0].location.city;
        $('.town').append(firstDataCity + ", " + firstDataState);
      } else {
        // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
        $('#results').append('<h5>We discovered no results!</h5>');
      }
    }
  });
}
