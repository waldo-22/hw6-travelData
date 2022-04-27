let apiKey = "5d5aabfd49686870736c0570b5cf1b9e"
let locationData = document.querySelector("#locationData");
let generateSearch = document.querySelector("#search")
let searchResult = ["https://api.openweathermap.org/data/2.5/forecast?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}"]
let currentTemp = document.querySelector("#currentTemp")
let currentWind = document.querySelector("#currentWind")
let currentHumidity = document.querySelector("#currentHumidity")
let currentUv = document.querySelector("#currentUv")

let tempDay1 = document.querySelector("#tempDay1")
let windDay1 = document.querySelector("#windDay1")
let humidityDay1 = document.querySelector("#humidityDay1")

let tempDay2 = document.querySelector("#tempDay2")
let windDay2 = document.querySelector("#windDay2")
let humidityDay2 = document.querySelector("#humidityDay2")

let tempDay3 = document.querySelector("#tempDay3")
let windDay3 = document.querySelector("#windDay3")
let humidityDay3 = document.querySelector("#humidityDay3")

let tempDay4 = document.querySelector("#tempDay4")
let windDay4 = document.querySelector("#windDay4")
let humidityDay4 = document.querySelector("#humidityDay4")

let tempDay5 = document.querySelector("#tempDay5")
let windDay5 = document.querySelector("#windDay5")
let humidityDay5 = document.querySelector("#humidityDay5")

let historyDisplay = document.querySelector("#historyDisplay")


document.getElementById("search").addEventListener("click", function () {
    let text = document.querySelector("#text").value
    searchOutput(text)

});
// when the page loads I need to check local storage and see if I have cities saved
// if I do have cities saved I need to get those, change them from a string to a array and save that as the value of test Array
// using localstorage.getItem("storedCity") how do you un-stringify things
let testArray = []
let storedCity = localStorage.getItem("storedCity")
if (storedCity) {
    testArray = JSON.parse(storedCity);
}
for (let index = 0; index < testArray.length; index++) {
    const searchedButton = document.createElement("button");
    searchedButton.textContent = testArray[index];
    searchedButton.addEventListener("click", function () {
        dontSaveButton(this.textContent)

    })
    historyDisplay.append(searchedButton)
}

// ********************** automatically render buttons when searching so you dont have to refresh page
function savedSearch(text) {
    let recentSearch = generateSearch.value;
    testArray.push(text)
    if (testArray.length >= 10) {
        testArray.shift();
    }
    console.log(JSON.stringify(testArray));
    localStorage.setItem("storedCity", JSON.stringify(testArray))

    // let displayedHistory = document.createElement()
    console.log(testArray) // we should only loop over this if test array is not stringified
    // let element = document.createElement(tagName[, options]);
    // for loop
    // we are iterating over our array of cities
    // I need to add the current city im in ony my forloop to that li (google how do I add text to a li using javascript)
    // make sure you're creating an element, adding text to that element, then appending it to the right spot


}
function searchOutput(text) {
    savedSearch(text)
    dontSaveButton(text)
    
}

function dontSaveButton(text) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${text}&appid=${apiKey}`)
        .then(response => response.json())
        .then(latNlonData => {
            // console.log(latNlonData)
            // reference HTML element
            let citySearched = $("#citySearched")
            citySearched.text(text)
            // console.log(latNlonData)
            setUvIndex(latNlonData)
            // console.log(ocData)
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&units=imperial&appid=${apiKey}`);
        })
        .then(searchResult => searchResult.json())
        .then(cityData => {
            console.log(cityData);

            currentWind.innerText = cityData.list[0].wind.speed
            currentTemp.innerText = cityData.list[0].main.temp
            currentHumidity.innerText = cityData.list[0].main.humidity

            tempDay1.innerText = cityData.list[0].main.temp
            windDay1.innerText = cityData.list[0].wind.speed
            humidityDay1.innerText = cityData.list[0].main.humidity

            tempDay2.innerText = cityData.list[1].main.temp
            windDay2.innerText = cityData.list[1].wind.speed
            humidityDay2.innerText = cityData.list[1].main.humidity

            tempDay3.innerText = cityData.list[2].main.temp
            windDay3.innerText = cityData.list[2].wind.speed
            humidityDay3.innerText = cityData.list[2].main.humidity

            tempDay4.innerText = cityData.list[3].main.temp
            windDay4.innerText = cityData.list[3].wind.speed
            humidityDay4.innerText = cityData.list[3].main.humidity

            tempDay5.innerText = cityData.list[4].main.temp
            windDay5.innerText = cityData.list[4].wind.speed
            humidityDay5.innerText = cityData.list[4].main.humidity



            // currentUv.innerText = cityData.current.uvi
        })
}
function setUvIndex(latNlonData) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latNlonData[0].lat}&lon=${latNlonData[0].lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(oneCallData => {
            ocData = oneCallData
            console.log(ocData)
            currentUv.innerText = ocData.current.uvi
        })
}

let timeDisplayEl = $('#time-display');
function displayTime() {
    let rightNow = moment().format('MMM DD, YYYY');
    timeDisplayEl.text(rightNow);
}
displayTime()


