$(function(){
  var url = 'https://restcountries.eu/rest/v2/name/';
  var countries = $('#countries');
  var table = $('#infoTable');

  $('#search').click(searchCountries);
  $("#question").tooltip();
  $('[data-toggle="tooltip"]').tooltip({
    placement : 'right'
  });

  function initMap(latMap, lngMap) {
    var uluru = {lat: latMap, lng: lngMap};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  function showCountriesList(resp) {
    table.children('tbody').empty();
    resp.forEach(function(item) {
      countries.css("display", "block");
      $('#flag').attr("src", item.flag);
      $('#name-h2').text(item.name);
      table.append('<tr><td>Capital </td><td>'+ item.capital +'</td></tr>');
      table.append('<tr><td>Population </td><td>'+ item.population +'</td></tr>');
      table.append('<tr><td>Language </td><td>'+ item.languages[0].name +' / '+ item.languages[0].nativeName+'</td></tr>');
      table.append('<tr><td>Currency  </td><td>'+ item.currencies[0].name +' - '+ item.currencies[0].code +'</td></tr>');
      initMap(item.latlng[0], item.latlng[1]);
    });
  }

  function searchCountries() {
    var countryName = $('#country-name').val();
    var fullName = "?fullText=true";
    if (!countryName.length) countryName = "Poland";
    $.ajax({
      url: url + countryName + fullName,
      method: 'GET',
      success: showCountriesList,
      error: function() {
        alert('Please enter full country name.');
      }
    });
  }
});
