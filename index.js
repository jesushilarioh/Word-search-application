var animalContainer = document.getElementById('demo');
var btn = document.getElementById('btn');

function myFunction(){
    var x = document.getElementById("myText").value;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://api.wordnik.com:80/v4/word.json/' + x + '/definitions?limit=2&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
    ourRequest.onload = function(){
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
}

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++){
        htmlString += '<h3>' + data[i].text + '</h3><p>TAKEN FROM: ' + data[i].attributionText + '.</p>';
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString );
}
