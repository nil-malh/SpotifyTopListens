const clientID = "redacted";
const clientSecret = "redacted";
const authBasic = btoa(clientID + ':' + clientSecret).toString('base64');
let errorMessage;

function getUserTopSongs(authToken,timePeriod="short_term")
{
    let albums = [];
    new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    if (!xhr.response) {
                        reject([500, 'Something unknown went wrong']);
                    } else {
                        resolve(JSON.parse(xhr.response));
                    }
                } else {
                    reject([xhr.status, xhr.response]);
                }
            }
        };
        xhr.open('GET', `https://api.spotify.com/v1/me/top/tracks?time_range=${timePeriod}`, true);
        xhr.setRequestHeader('Authorization', `Bearer ${authToken}` );
        xhr.setRequestHeader( 'Content-Type',   'application/x-www-form-urlencoded' );
    
        xhr.send();
    }).then((response) => {
        let rank = 0 ;
        let divSongContainer = document.createElement("div");
            divSongContainer.className = "songs-container";
        for (const album of response.items) {
            let songContainer = document.createElement("div");
            songContainer.className = "song a";
 
            const albumName = album.album.name;
            const artistName = album.album.artists[0].name;
            const songName = album.name;
            const albumCoverURL = album.album.images[0].url;
            //console.log(album.album.images[0].url);
            rank++;
            let img = document.createElement("img");
            img.className = "artwork mt-3";
            img.src = albumCoverURL;

// Create a p element to display the song name
            let p = document.createElement("p");
            p.className = "song-title";
            p.innerHTML = rank+". " + songName + ' | ' + artistName;

// Append the img and p elements to the body of the webpage
            songContainer.appendChild(img);
            songContainer.appendChild(p);
            divSongContainer.appendChild(songContainer);
        }
        document.body.appendChild(divSongContainer)        
      
    }).catch((value) => {
        errorMessage = document.createElement("p");
        errorMessage.className = "api-error text-center";
        errorMessage.textContent = "Huh-oh something went wrong with the request (Error : " + value[0] +value[1].split("message")[1].replace("{","").replace("}","") + ")";
        document.body.appendChild(errorMessage);
        console.log(value);
    });
    
}

let userToken = undefined;


    let loginDiv = document.createElement("div");
        loginDiv.className = "login-container";

    let welcomeTextDiv = document.createElement("p")
        welcomeTextDiv.className = "text-spotify text-green text-center text-3rem";
        welcomeTextDiv.innerText = "Due to this project being front-end only I can't give you your token to get your top songs, You will need to go to the Spotify Website and grab your token or ";

    let redirectButton = document.createElement("a")
        redirectButton.className = "redirect-button text-center";
        redirectButton.target = "_blank"
        redirectButton.href = "https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/?type=tracks&time_range=&limit=&offset="
        redirectButton.innerText = "Click here !"

        let form = document.createElement("form");

        let formDiv = document.createElement("div");
            formDiv.className = "inputbox"


    let inputToken = document.createElement("input");
        inputToken.type = "text";
        inputToken.id = "token";
        inputToken.className = "input mt-1";
        inputToken.required = "required";
//*<label for="name" class="form__label">Name</label>
   

/*
<form>
  <p>Veuillez choisir la meilleure méthode pour vous contacter :</p>
  <div>
    <input type="radio" id="contactChoice1"
     name="contact" value="email">
    <label for="contactChoice1">Email</label>

    <input type="radio" id="contactChoice2"
     name="contact" value="telephone">
    <label for="contactChoice2">Téléphone</label>

    <input type="radio" id="contactChoice3"
     name="contact" value="courrier">
    <label for="contactChoice3">Courrier</label>
  </div>
*/
// Create radio input for "2 weeks" option
var radio2Weeks = document.createElement("input");
radio2Weeks.type = "radio";
radio2Weeks.name = "timeRange";
radio2Weeks.value = "short_term";

// Create label for "2 weeks" option
var label2Weeks = document.createElement("label");
label2Weeks.innerHTML = "4 weeks";

// Create radio input for "6 months" option
var radio6Months = document.createElement("input");
radio6Months.type = "radio";
radio6Months.name = "timeRange";
radio6Months.value = "medium_term";

// Create label for "6 months" option
var label6Months = document.createElement("label");
label6Months.innerHTML = "6 months";

// Create radio input for "all time" option
var radioAllTime = document.createElement("input");
radioAllTime.type = "radio";
radioAllTime.name = "timeRange";
radioAllTime.value = "long_term";

// Create label for "all time" option
var labelAllTime = document.createElement("label");
labelAllTime.innerHTML = "all time";

// Add radio inputs and labels to form



    let buttonToken = document.createElement("button");
    buttonToken.className = "button-submit mt-1";
    buttonToken.innerHTML = "Submit";

    // AddToken an event listener to the button
    buttonToken.addEventListener("click", function(){
        // Get the value of the input text field using querySelector
        let inputValue = document.querySelector("#token").value;
        // Do something with the input value, e.g. alert it
        let timeRange = document.querySelector('input[name="timeRange"]:checked');
        if(timeRange === null)
            timeRange = "short_term";   
        timeRange = timeRange.value;
        console.log("Selected time range: " + timeRange);

        getUserTopSongs(inputValue,timeRange)
        if(errorMessage !== null)
                errorMessage.remove();
    });


        loginDiv.appendChild(welcomeTextDiv);
        loginDiv.appendChild(redirectButton);

        formDiv.appendChild(inputToken);
        formDiv.appendChild(radio2Weeks);
        formDiv.appendChild(label2Weeks);
        formDiv.appendChild(radio6Months);
        formDiv.appendChild(label6Months);
        formDiv.appendChild(radioAllTime);
        formDiv.appendChild(labelAllTime);

        form.appendChild(formDiv);
        loginDiv.appendChild(form); 
        loginDiv.appendChild(buttonToken);

        document.body.appendChild(loginDiv);    



//getUserTopSongs("BQBqEkbJVdIjQ_ocvdwHpRg5vJPSY3CgcKAQmrEFO17gA0vVlXUy0c1sNDQcgGCNrrqTEalSczKEiyMLbp6I9xN_TTUvaKLyh__cFn-yxAYThDPjMiTgn0KgUI1Hbwj1ZAoppmoc2v_xz4tMIsY_MZGM-35bre4ZLKjWvctSWuom__72-lKhROIgJEE")