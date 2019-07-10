$( document ).ready(function() {
    console.log( "ready!" );
    // searchTowns();


searchUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=";
console.log(searchUrl);


//search towns on enter
$(document).on('keypress',function(e) {
if(e.which == 13) {
    searchTowns();
    $('.layoutContainer').addClass('layout2');
}
});

//Search for towns from users input
function searchTowns(){
  $('#results').empty();
  $("#loader").removeClass("hideLoader");
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
    contentType: "application/json; charset=utf-8",
    success: function(data){
      // Grab the results from the API JSON return
      var totalresults = data.total;
      console.log(totalresults);

      var Business = function(id, alias, phone, image, name, rating, reviewcount, address, city, state, zipcode){
        this.id = id;
        this.alias = alias;
        this.phone = phone;
        this.image = image;
        this.name = name;
        this.rating = rating;
        this.reviewcount = reviewcount;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
      };

      // If our results are greater than 0, continue
      if (totalresults > 0){
        $("#loader").addClass("hideLoader");

        // console.log("running total results" + myurl);
        // console.log("total results are: " + totalresults);
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
          var price = '';
          var url = item.url;
          // var categories = item.categories[i].title;

          let categories;
          try {
            categories = item.categories[0].title;
          } catch (error) {
            categories = '';
          }

          if (item.price !== undefined) {
            price = item.price;
          }

          // if (typeof item.categories[i].title !== "undefined"){
          //    categories = item.categories[i].title;
          // }

          // Append our result into our page

          var currentBusiness = new Business(id, alias, phone, image, name, rating, reviewcount, address, city, state, zipcode);
          $('#results').append('<div class="jaunt" id="' + id + '">' +
          '<div class="businessDetails"><a href="' + url + '" target="_blank" style="text-decoration:none"><h1 class="businessName">' + name + '</h1></a>' +
          '<p class="price"">' + '<span style="color:#26361d;">' + price + '</span>' + ' '+ categories + '</p>' +
          '<p>' + address + ' ' +
          city + ', ' +
          state + ' ' +
          zipcode + '<br>' +
          phone + '<br><br>' +
          '<a href=' + url + ' target="_blank">' + '<i class="fab fa-yelp fa-2x" style="color:#d32323"></i>' + '</a>' + ' ' +
          '</p>' + '</div>' +
          '<div class="imageContainer">' + '<img src="' + image + '">' + '</div>' +
          '<br></div>');


        });
        var firstDataState = data.businesses[0].location.state;
        var firstDataCity = data.businesses[0].location.city;
        $('.town').append(firstDataCity + ", " + firstDataState);
      } else {
        console.log("total results: " + totalresults);
        // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
        $('#results').append('<h5 class="noResultsMessage">We discovered no results!</h5>');
      }
    },
    error: function(errormessage){
      $("#loader").addClass("hideLoader");
      $('#results').append('<h1 class="failedResultsMessage">Sorry, but we did not understand the location that you entered.</h1>');

    }
  });
}

});
