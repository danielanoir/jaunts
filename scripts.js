
// - action can be triggered onclick of Enter or clicking Search button
// - function triggered by click will take string typed,
//
// FUNCTION
// Remove spaces from string (only letters or numbers get pulled into the next variable)
// if length is less than 5, nothing happens
// If length is equal to or more than 5, send to variable
// Concatonate new variable to end of "myurl" variable
// Than run search using new variable url

var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=25425";

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
          // If our results are greater than 0, continue
          if (totalresults > 0){
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
                  $('#results').append('<div class="juant" id="' + id + '""><img src="' + image + '" style="width:200px;height:150px;"><br> <b>' + name + '</b>  <br>' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>' + phone + '<br></div>');
            });
          } else {
              // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
              $('#results').append('<h5>We discovered no results!</h5>');
          }
      }
   });
