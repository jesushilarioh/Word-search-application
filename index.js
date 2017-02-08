// Variables
var animalContainer = document.getElementById('demo');
var btn = document.getElementById('btn');

// Main function
function myFunction(){
    var x = document.getElementById("myText");
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://api.wordnik.com:80/v4/word.json/' + x.value + '/definitions?limit=2&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
    ourRequest.onload = function(){
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);

        x.addEventListener("keypress", function() {
          console.log(ourData[0]);
          var htmlString = "";

          for (i = 0; i < ourData.length; i++){
              animalContainer.innerHTML = htmlString += ourData[0];
          }
        });

    };

    ourRequest.send();
}

// Secondary functions
function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++){
        htmlString += '<h3>' + data[i].text + '</h3><p>TAKEN FROM: ' + data[i].attributionText + '.</p>';
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString );
}
