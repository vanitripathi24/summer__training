const API_KEY = "2adab2fe3d96b8e7d56e4700534db389";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const condition = document.getElementById("condition");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const dateTime = document.getElementById("dateTime");

const weatherCard = document.getElementById("weatherCard");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const historyList = document.getElementById("historyList");

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city){
        getWeather(city);
    }

});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city){
            getWeather(city);
        }

    }

});

async function getWeather(city){

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weatherCard.classList.add("hidden");

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        country.textContent = data.sys.country;

        temp.textContent =
        Math.round(data.main.temp);

        feelsLike.textContent =
        Math.round(data.main.feels_like);

        humidity.textContent =
        data.main.humidity;

        wind.textContent =
        data.wind.speed;

        pressure.textContent =
        data.main.pressure;

        condition.textContent =
        data.weather[0].main;

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        sunrise.textContent =
        new Date(
            data.sys.sunrise * 1000
        ).toLocaleTimeString();

        sunset.textContent =
        new Date(
            data.sys.sunset * 1000
        ).toLocaleTimeString();

        dateTime.textContent =
        new Date().toLocaleString();

        weatherCard.classList.remove("hidden");

        saveSearch(city);

    }

    catch(err){

        error.textContent =
        "City not found. Please try again.";

        error.classList.remove("hidden");

    }

    finally{

        loading.classList.add("hidden");

    }

}

function saveSearch(city){

    let searches =
    JSON.parse(
        localStorage.getItem("weatherSearches")
    ) || [];

    city =
    city.charAt(0).toUpperCase() +
    city.slice(1).toLowerCase();

    if(!searches.includes(city)){

        searches.unshift(city);

        if(searches.length > 5){
            searches.pop();
        }

        localStorage.setItem(
            "weatherSearches",
            JSON.stringify(searches)
        );

    }

    displayHistory();

}

function displayHistory(){

    historyList.innerHTML = "";

    const searches =
    JSON.parse(
        localStorage.getItem("weatherSearches")
    ) || [];

    searches.forEach(city => {

        const li =
        document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {

            cityInput.value = city;

            getWeather(city);

        });

        historyList.appendChild(li);

    });

}

displayHistory();

const searches =
JSON.parse(
    localStorage.getItem("weatherSearches")
) || [];

if(searches.length > 0){

    getWeather(searches[0]);

}