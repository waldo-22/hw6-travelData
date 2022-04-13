let apiKey = "5d5aabfd49686870736c0570b5cf1b9e"
let locationData = document.querySelector("#locationData");


fetch(`https://api.openweathermap.org/geo/1.0/direct?q=Dallas&appid=${apiKey}`)
.then(response => response.json())
.then(latNlonData => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}`);

})
.then(response => response.json())
.then(cityData => {
    console.log(cityData);
})


function searchSubmit() {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searcharea.value}&appid=${apiKey}`)
    .then(srchResponse => srchResponse.json())
    .then(srchData =>{
        console.log(srchData)
    })

}

btn.addEventListener('click', function()) 


// inputForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     enteredMovie = document.querySelector(".enteredMovie").value;
//     pullMovieInfo();
//     pullMovieTrailer();
//     inputForm.reset();
// });


// let searchSubmit = document.querySelector('showConditions');

// button.addEventListener('searchSubmit', event => {
//   button.textContent = `searchResultArea: ${event.detail}`;
// });

// fetchButton.addEventListener('searchSubmit', apiKey);


// fetch(`https://api.openweathermap.org/data/2.5/weather?Dallas&appid=${apiKey}`)
// .then(response => response.json())
// .then(currentWeather => {
         
// })


// return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`);