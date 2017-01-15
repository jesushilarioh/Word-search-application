var animalContainer = document.getElementById('demo');
var btn = document.getElementById('btn');

function myFunction(){
    var x = document.getElementById("myText").value;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://api.wordnik.com:80/v4/word.json/' + x + '/definitions?limit=2&includeRelated=true&useCanonical=false&includeTags=false&api_key=551cd772a6bd0f92b40010e295e0739d0acaf17d08ecc3c9d');
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
