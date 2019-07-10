var businessList = [];
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
// // Append our result into our page
// $('#results').append('<div class="jaunt" id="' + id + '"">' + '<img src="' + image + '">' + name + '<br>' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>' + phone + '<br></div>');
var businessObject = "business" + i.toString();
businessObject = new Business(id, alias, phone, image, name, rating, reviewcount, address, city, state, zipcode);
businessList.push(businessObject);
console.log(businessObject[i]);
});
