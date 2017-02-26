(function() {
    //"use strict";

    // Global variables
    var httpRequest;
    var httpRequest2;

    // Add event listeners to ajaxButton and ajaxTextbox
    document.getElementById("ajaxButton").addEventListener("click", usersValue);
    document.getElementById("ajaxTextbox").addEventListener("keyup", usersValue);

    // Recieve value from the user
    function usersValue() {
        let word = document.getElementById("ajaxTextbox").value.toLowerCase();
        makeRequest("http://api.wordnik.com:80/v4/word.json/" + word + "/definitions?limit=5&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=551cd772a6bd0f92b40010e295e0739d0acaf17d08ecc3c9d");
        makeRequest2("http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=100&api_key=551cd772a6bd0f92b40010e295e0739d0acaf17d08ecc3c9d");
    }

    //"http://api.wordnik.com/v4/word.json/" + word + "/relatedWords?limit=200&includeRelated…ncludeTags=false&api_key=551cd772a6bd0f92b40010e295e0739d0acaf17d08ecc3c9d"


    // Request the URL api
    function makeRequest(url) {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :[ Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = requestStatus;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    function makeRequest2(url) {
        httpRequest2 = new XMLHttpRequest();

        if (!httpRequest2) {
            alert('Giving up :[ Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest2.onreadystatechange = requestStatus2;
        httpRequest2.open('GET', url);
        httpRequest2.send();
    }

    // Methods to take when receiving a response
    function requestStatus() {
        const searchedWord = document.getElementById("word"),
            partOfSpeech = document.getElementById("partOfSpeech"),
            wordDefinition = document.getElementById("definitions"),
            source = document.getElementById("source"),
            rowLeft = document.getElementById("rowLeft");
            rightLeft = document.getElementById("rowRight");

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            switch (httpRequest.status) {
                case 200:
                    const JSONParse = JSON.parse(httpRequest.responseText);
                    rowLeft.className = "well";

                    if (typeof(JSONParse[0]) === 'undefined') {
                        searchedWord.innerHTML = "<strong id='wrongWord'>" + document.getElementById("ajaxTextbox").value.toLowerCase();
                        partOfSpeech.textContent = "...Hmmm... That's an interesting input...";
                        wordDefinition.textContent = "However, There are no suggestions at this time..."
                        source.textContent = "Please Try Again.";
                    } else {
                        searchedWord.className = "green";
                        searchedWord.textContent = JSONParse[0].word;
                        partOfSpeech.textContent = JSONParse[0].partOfSpeech;
                        let string1 = "";

                        for (i = 0; i < JSONParse.length; i++) {
                            string1 += "<h4 id='definitions2'>" + JSONParse[i].text + "</h4>" + "<h4><small id='source2'>" + JSONParse[i].attributionText + "</small></h4>";

                            definitions.innerHTML = string1;
                        }
                        source.textContent = "";
                    }
                    break;
                case 400:
                    rowLeft.className = "";
                    emptyAll();
                    break;
                case 404:
                    rowLeft.className = "";
                    emptyAll();
                    break;
                case 503:
                    rowLeft.className = "well";
                    emptyAll();
                    sorryText();
                    break;
                default:
                    rowLeft.className = "well";
                    emptyAll();
                    sorryText();
            }
        }

        function emptyAll() {
            emptyString(searchedWord, true);
            emptyString(partOfSpeech, true);
            emptyString(wordDefinition, true);
            emptyString(source, true);
        }

        function sorryText() {
            const sorry = "We're sorry, your request could not be processed at this time. Technical difficulties have occured on our end... please check back soon!";
            wordDefinition.textContent = sorry;
        }
    }


    // Inner api data to index.html
    function emptyString(usersWord, bool) {
        if (bool === true) {
            usersWord.textContent = "";
        } else {
            usersWord.className = "";
        }
    }

    function requestStatus2() {
        const searchedWord = document.getElementById("word"),
            partOfSpeech = document.getElementById("partOfSpeech"),
            wordDefinition = document.getElementById("definitions"),
            source = document.getElementById("source"),
            typeOfRelation = document.getElementById("typeOfRelation"),
            relatedWords = document.getElementById("relatedWords");

        if (httpRequest2.readyState === XMLHttpRequest.DONE) {
            switch (httpRequest2.status) {
                case 200:
                    const JSONParse2 = JSON.parse(httpRequest2.responseText);

                    if (typeof(JSONParse2[0]) === 'undefined') {
                        rowRight.className = "";
                        emptyString(relatedWords, true);
                        emptyString(typeOfRelation, true);
                    } else {
                        rowRight.className = "well";
                        let HTMLstring = "";

                        for (i = 0; i < JSONParse2[0].words.length; i++) {
                            HTMLstring += "<a value='" + JSONParse2[0].words[i] + "' id='"+ JSONParse2[0].words[i] +"'>" + JSONParse2[0].words[i] + "</a>";
                        }

                        typeOfRelation.textContent = JSONParse2[0].relationshipType + "s";
                        relatedWords.innerHTML = HTMLstring;

                        // Assign all links to links variables
                        var links = relatedWords.querySelectorAll("a");

                        // Add an event listenr to each link
                        for (var i = 0; i < links.length; i++) {
                            links[i].addEventListener("click", function() {

                                // When click the value will be replaced in input box
                                document.getElementById("ajaxTextbox").value = this.textContent;

                                usersValue();
                            });
                        }
                    }
                    break;
                case 400:
                    rowRight.className = "";
                    emptyString(relatedWords, true);
                    emptyString(typeOfRelation, true);
                    break;
                case 404:
                    rowRight.className = "";
                    emptyString(relatedWords, true);
                    emptyString(typeOfRelation, true);
                    break;
                case 503:
                    rowRight.className = "";
                    emptyString(relatedWords, true);
                    emptyString(typeOfRelation, true);
                    break;
                default:
                    rowRight.className = "";
                    emptyString(relatedWords, true);
                    emptyString(typeOfRelation, true);
            }
        }
    }
})();
