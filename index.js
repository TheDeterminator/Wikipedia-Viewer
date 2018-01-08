var url =
  "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";

$(document).ready(function() {
  
  function getSearch() {
    $("#search").click(function() {    
    
      var searchTerm = $("#searchTerm").val();
      var url =
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        searchTerm +
        "&format=json&callback=?";

      $.getJSON(url, function(json) {
        $("#output").html("");

        for (i = json[1].length - 1; i >= 0; i--) {
          $("#output").prepend(
            "<li><a href='" +
              json[3][i] +
              "' target='_blank'>" +
              json[1][i] +
              "</a><p>" +
              json[2][i] +
              "</p></li>"
          );
        }
      });
      $("#searchTerm").val("");
    });
  }
  
  $("#searchTerm").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});

  getSearch();
  
  $("#searchTerm").keypress(function (e){
      if (e.which==13) {
     $("#search").click();
      }
    });
});
