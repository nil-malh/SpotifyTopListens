const clientID = "redacted";
const clientSecret = "redacted";
const authBasic = btoa(clientID + ':' + clientSecret).toString('base64');

function retriveOAuthToken()
{
    let authToken ="";
    let body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
      let bodyString = JSON.stringify(body);
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
    xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
    xhr.setRequestHeader('Authorization', `Basic ${authBasic}` );
    xhr.setRequestHeader( 'Content-Type',   'application/x-www-form-urlencoded' );

    xhr.send(body);
}).then((value) => {
    console.log(`Success ! Retrived authToken : ${value.access_token}`);
    authToken = value.access_token;
}).catch((value) => {
    console.log(value);
});
    return authToken;
}

//const authToken = retriveOAuthToken();

function aboutSong(authToken , trackID="0")
{

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
    let token = retriveOAuthToken();
    xhr.open('GET', 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', true);
    xhr.setRequestHeader('Authorization', `Bearer BQCCkHkA1HeByHYIuQoMVNMP0DOSu8_y5arCsANv4uq7uX6Bfa_-7q2V_wBRnBKJm1Oauh33wFwTCzeMWb72wMzv45ClBLmq70g_-B3dFQdNEsqrhJSS` );
    xhr.setRequestHeader( 'Content-Type',   'application/x-www-form-urlencoded' );

    xhr.send();
}).then((value) => {
    console.log(`Success ! Retrived data : ${value.album.name}`);
}).catch((value) => {
    console.log(value);
});

}

/*
curl -X "GET" "https://api.spotify.com/v1/me/top/tracks" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCdv3XMlu0ndbMhFpM2HQ2ZUhsIsolIa6kw3h9pPkduqBvbXcIshSgz_b9RMeX9MFdqnbr6ZXAeD-O88ddRgxKUU7d3UekYlv2FSWPsNc8iBYOKYGhEDZBvRz05OeGyiiKWtE5RjbZO1WHgg-UzC7RVuoKH4ry9oMRtNjzTBJuTYEYX00DHC78tTcE"
*/

let errorMessage;
function getUserTopSongs(authToken)
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
        xhr.open('GET', 'https://api.spotify.com/v1/me/top/tracks', true);
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
            console.log(album.album.images[0].url);
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
        console.log(`Success ! Retrived data : ${response.items}`);
        
      
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

        let formDiv = document.createElement("div");
            formDiv.className = "inputbox"


    let inputToken = document.createElement("input");
        inputToken.type = "text";
        inputToken.id = "token";
        inputToken.className = "input mt-1";
        inputToken.required = "required";
//*<label for="name" class="form__label">Name</label>
        let labelToken = document.createElement("span");

        let isep = document.createElement("i");

    let buttonToken = document.createElement("button");
    buttonToken.className = "button-submit mt-1";
    buttonToken.innerHTML = "Submit";

    // AddToken an event listener to the button
    buttonToken.addEventListener("click", function(){
        // Get the value of the input text field using querySelector
        var inputValue = document.querySelector("#token").value;
        // Do something with the input value, e.g. alert it
        getUserTopSongs(inputValue)
        errorMessage.remove();
    });


        loginDiv.appendChild(welcomeTextDiv);
        loginDiv.appendChild(redirectButton);

        formDiv.appendChild(inputToken);
        formDiv.appendChild(labelToken);
        formDiv.appendChild(isep);

        loginDiv.appendChild(formDiv); 
        loginDiv.appendChild(buttonToken);

        document.body.appendChild(loginDiv);    



//getUserTopSongs("BQBqEkbJVdIjQ_ocvdwHpRg5vJPSY3CgcKAQmrEFO17gA0vVlXUy0c1sNDQcgGCNrrqTEalSczKEiyMLbp6I9xN_TTUvaKLyh__cFn-yxAYThDPjMiTgn0KgUI1Hbwj1ZAoppmoc2v_xz4tMIsY_MZGM-35bre4ZLKjWvctSWuom__72-lKhROIgJEE")