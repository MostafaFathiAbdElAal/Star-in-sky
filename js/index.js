"use strict"
// ^ API Deatils weather for 3 days URL : "https://api.weatherapi.com/v1//forecast.json?key=138ab61063da4d96955175618241410&q=${country}&aqi=yes&days=3" Method: "GET"
// ^ API Name citses in search URL : "https://api.weatherapi.com/v1//search.json?key=138ab61063da4d96955175618241410&q=${country}" Method: "GET"
// ^ API user ip URL : "https://api.ipify.org/?format=json",Methods:"GET"
//* HTML elements
const today = document.getElementById("today")
const currentWeather = document.getElementById("currentWeather")
const day2 = document.getElementById("day2")
const day3 = document.getElementById("day3")
const inputSearch = document.getElementById("search")
const inputSubmit = document.getElementById("submit")
const dataListSearch = document.getElementById("searchHelp")
const allDivInsideSearch = document.querySelectorAll("#searchHelp > *")
const btnContact = document.getElementById("btnContact")
const btnYourLocaton = document.getElementById("btnYourLocation")
//* Functions
// Locate user ip address
async function ip() {
    let ipUSer = await fetch("https://api.ipify.org/?format=json")
    let dataIp = await ipUSer.json()
    console.log(dataIp.ip);
    if (inputSearch.value === "") {
        getDetails(dataIp.ip)
    }
};
ip()
async function getDetails(country) {
    let weatherAPI1 = await fetch(`https://api.weatherapi.com/v1//forecast.json?key=138ab61063da4d96955175618241410&q=${country}&aqi=yes&days=3`)
    let fullData = await weatherAPI1.json()
    console.log(fullData);
    let nameCountryToDataList = await fetch(`https://api.weatherapi.com/v1//search.json?key=138ab61063da4d96955175618241410&q=${country}`)
    let backFullDataName = await nameCountryToDataList.json()
    if (inputSearch.value === "") {
        //~ =======> Start find your city on googleMap <=======
        btnYourLocaton.setAttribute("href", `https://maps.google.com/maps?q=${backFullDataName[0].lat},${backFullDataName[0].lon}`)
        //~ =======> End Find your city on googleMap <=======
    }
    // Just show when user typeing
    if (inputSearch.value !== "") {
        for (let i of backFullDataName) {
            dataListSearch.innerHTML +=
                `<div class="text-black d-block p-1 w-100 fs-6" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-weight: 700;cursor:pointer">${i.name}</div>`
            if (inputSearch.value === i.name) {
                dataListSearch.innerHTML = ``
            }
        }
    }
    if (fullData.location !== undefined || null) {
        (function currentDay() {
            let formaterArray = DateFormater(0)  // [Number day , Month name , Day name , Time current]
            currentWeather.innerHTML = `
            <div class="forecast-header" id="today">
            <div class="day">${formaterArray[2] || "Not available now"}</div>
            <div class=" date">${formaterArray[0] + " " + formaterArray[1] + " " + formaterArray[3] || "Not available now"}</div>
            </div> <!-- .forecast-header -->
            <div class="forecast-content" id="current">
            <div class="location">${fullData.location.name || "Not available now"}</div>
            <div class="degree">
            <div class="num">${fullData.current.temp_c.toFixed(1)}<sup>o</sup>C</div>
            
            <div class="forecast-icon">
            <img src="${fullData.current.condition.icon || "Not available now"}" alt="" width="90">
            </div>	
            
            </div>
            <div class="custom">${fullData.current.condition.text || "Not available now"}</div>
            <span class="fw-bold"><img src="./images/icons/icon-umberella.png" alt="umberella">${fullData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
            <span class="fw-bold"><img src="./images/icons/icon-wind.png" alt="Wind icon">${Math.trunc(fullData.forecast.forecastday[0].day.maxwind_mph) || "Not available now"}km/h</span>
            <span class="fw-bold"><img src="./images/icons/icon-compass.png" alt="compass icon">${fullData.current.wind_dir}</span>
            </div>    
            `})();
        // NextDay 
        (function nextDay(index) {
            let formaterArray = DateFormater(index)  // [Number day , Month name , Day name, Time current]           
            day2.innerHTML = `
            <div class="forecast-header">
            <div class="day">${formaterArray[2] || "Not available now"}</div>
            </div> <!-- .forecast-header -->
            <div class="forecast-content">
            <div class="forecast-icon">
            <img src="https:${fullData.forecast.forecastday[index].day.condition.icon || "Not available now"}" alt=""
            width="48">
            </div>
            <div class="degree">${fullData.forecast.forecastday[index].day.maxtemp_c || "Not available now"}<sup>o</sup>C</div>
            <small>${fullData.forecast.forecastday[index].day.mintemp_c || "Not available now"}<sup>o</sup></small>
            <div class="custom">${fullData.forecast.forecastday[index].day.condition.text || "Not available now"}</div>
            </div>
            `
        })(1);
        // Lastday
        (function lastDay(index) {
            let formaterArray = DateFormater(index)  // [Number day , Month name , Day name , Time current]
            day3.innerHTML = `
            <div class="forecast-header">
            <div class="day">${formaterArray[2] || "Not available now"}</div>
            </div> <!-- .forecast-header -->
            <div class="forecast-content">
            <div class="forecast-icon">
            <img src="${fullData.forecast.forecastday[index].day.condition.icon || "Not available now"}" alt=""
            width="48">
            </div>
            <div class="degree">${fullData.forecast.forecastday[index].day.maxtemp_c || "Not available now"}<sup>o</sup>C</div>
            <small>${fullData.forecast.forecastday[index].day.mintemp_c || "Not available now"}<sup>o</sup></small>
            <div class="custom">${fullData.forecast.forecastday[index].day.condition.text || "Not available now"}</div>
            </div>
            </div>
            </div>
            `
        })(2)

    }
    //^ ================> Start date formater <=================
    function DateFormater(index) {
        const namesOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let fullDate = new Date(fullData.forecast.forecastday[index].date)
        let numberOfDayInMonth = fullDate.getDate()
        let monthName = namesOfMonths[fullDate.getMonth()]
        let dayName = weekdays[fullDate.getDay()]
        let timeCurrent = []
        timeCurrent.push(fullData.current.last_updated.split(" "))
        return [numberOfDayInMonth, monthName, dayName, timeCurrent[0][1]]
    }
    //^ ================> End date formater <=================

}
//* Events
inputSearch.addEventListener("input", function () {
    getDetails(inputSearch.value)
    dataListSearch.innerHTML = ``
    ip()
})
// ^ target element to access text and put on inputSearch
dataListSearch.addEventListener("click", function (eventInfo) {
    inputSearch.value = `${eventInfo.target.innerHTML}`
    getDetails(inputSearch.value)
    dataListSearch.innerHTML = ``
})