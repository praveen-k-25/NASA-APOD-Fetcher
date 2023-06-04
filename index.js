let visit_list = [];

// Setaup an Object Array in the alocal storage
localStorage.setItem("Searches",JSON.stringify(visit_list));

const data_list = document.getElementById("dates");


//–-----    When the web age load it get's ecxecuted. -------
document.addEventListener("DOMContentLoaded", getCurrentImageOfTheDay,max);

// ------ Image of the present date has shown -------
function getCurrentImageOfTheDay() {
    let currentDate = new Date().toISOString().split("T")[0];
    to_fetch(currentDate);
}

function max(){
    let currentDate = new Date().toISOString().split("T")[0];
    document.getElementById("search_input").setAttribute("max", currentDate);
};

// ---- When the shows the image at particular date ----

document.getElementById("form_date").addEventListener("submit",getImageOfTheDay);

function getImageOfTheDay(event) {
    event.preventDefault();

    let date = document.getElementById("search_input").value;
    to_fetch(date);

    let arr = JSON.parse(localStorage.getItem("Searches"));
    arr.push({"dates":date});
    localStorage.setItem("Searches",JSON.stringify(arr));

    saveSearch(date);
    visit_list.push(date);
    addSearchToHistory();

    document.getElementById("date_on").innerHTML = `Picture On ${date}`;
      
}
// ----- Save the date in the array ----;


function saveSearch(date) {
  visit_list.push(date);
}


// ---- Save the visited date to the local storage area ----
function addSearchToHistory() {
    data_list.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("Searches"));
    
    arr.forEach((date) => {
      let li = document.createElement("li");
      let ar = document.createElement("a");
      ar.textContent = date.dates;
      ar.href ="#";
      ar.addEventListener("click", function(event) {
        event.preventDefault();
        to_fetch(date.dates);
        addSearchToHistory();
      });
      li.appendChild(ar);
      data_list.appendChild(li);
    })
}

// to fetch the request from the server
// 1 - sG3bsbJLHSCiaX8x451c4Vi6cQY4XhyyL2hSMrTA
// 2 - QL00SFyBZtTw2Dlk9PbKjXPEQTHpDPFyiVAYQX6C

// It fetch data from nasa server ------
function to_fetch(date) {
    const api_key = "QL00SFyBZtTw2Dlk9PbKjXPEQTHpDPFyiVAYQX6C";
    var url = "https://api.nasa.gov/planetary/apod?api_key=" + api_key + "&date=" + date;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract the image URL
        var imageUrl = data.url;
        var title = data.title;
        var content = data.explanation;
  
        // Display the image , title and content. 
        var imageContainer = document.getElementById("nasa_image");
        imageContainer.innerHTML = "<img src='" + imageUrl + "' alt='NASA Image'>";
        document.getElementById("title").innerHTML = title;
        document.getElementById("content").innerHTML = content;

      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
}
