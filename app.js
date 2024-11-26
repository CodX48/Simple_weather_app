const  APIKey = "6a12c5971cfe1cea9fa803c16afe3b52"
import {searchapp} from "./searchapp.js";
import { weatherfound } from "./weatherfound.js";
const search_input = document.querySelector('.search-input');
const search_btn = document.getElementById('search_btn');
const main_cont = document.querySelector('.main-container');

function queryUpdatedDOM() {
    return {
        city_name: document.querySelector('.current-weather-info h1'),
        temp: document.querySelector('.current-weather-info p'),
        date: document.querySelector('.current-weather-info span'),
        icon: document.querySelector('.current-weather img'),
        more_info: document.querySelectorAll('.more-info div'),
        comming_hours: document.querySelector('.comming-hours'),
        weather_cond: document.getElementById('weather_cond'),
    };
}

const app_cont = document.querySelector('.app-content');
app_cont.innerHTML = searchapp();


async function getFeachData(type,city) {
    return (await fetch(`https://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${APIKey}&units=metric`)).json()
}

async function fetchData(city) {
    try {
        const [DataForecast, DataWeather] = await Promise.all([
            getFeachData("forecast", city),
            getFeachData("weather", city),
        ]);

        if (DataForecast.cod == "200" && DataWeather.cod == 200) {
            app_cont.innerHTML = weatherfound();

            const updatedElements = queryUpdatedDOM();
            
            UpdateWeather(DataWeather, updatedElements);
            ForecastData(DataForecast, updatedElements);
            main_cont.style.height = '80%';
        } else {
            throw new Error("Fetch failed");
        }
    } catch (err) {
        window.alert(err);
    }
}

async function UpdateWeather(Data, elements) {
    console.log(Data)
    elements.city_name.textContent = Data.name;
    elements.temp.textContent = `${Math.round(Data.main.temp)}° / ${Math.floor(Data.main.temp_min)}°`;
    elements.date.textContent = currentDate();
    elements.more_info[0].children[1].textContent = `${Math.round(Data.main.feels_like)}°C`;
    elements.more_info[1].children[1].textContent = `${Math.round(Data.wind.speed)} m/s`;
    elements.icon.src = GetWeatherIcon(Data.weather[0].id);
    elements.weather_cond.textContent = Data.weather[0].description;
}

async function ForecastData(data, elements) {
    elements.comming_hours.innerHTML = null;
    for (let i = 0; i < 10; i++) {
        elements.comming_hours.innerHTML += `
        <div>
        <p>${`${data.list[i].dt_txt}`.split(" ")[1].split(":")[0]}</p>
        <img src="${GetWeatherIcon(data.list[i].weather[0].id)}" alt="">
        <p>${Math.round(data.list[i].main.temp)}°C</p>
        </div>`;
    }
}


function currentDate(){
    const date = new Date();
    const format = {
        month:"short",
        hour:"numeric"
    }
    return new Intl.DateTimeFormat("en-US",format).format(date);
}

function GetWeatherIcon(id) {
    if(id <= 232){
        return `photos/07d.png`
    }else if(id <= 321){
        return `photos/05d.png`
    }else if(id <= 531){
        return `photos/06d.png`
    }else if(id <= 622){
        return `photos/08d.png`
    }else if(id <= 781){
        return `photos/09d.png`
    }else if(id <= 800){
        return `photos/01d.png`
    }else if(id <= 801){
        return `photos/02d.png`
    }else if(id <= 802){
        return `photos/03d.png`
    }else if(id <= 803){
        return `photos/04d.png`
    }else if(id <= 804){
        return `photos/04d.png`
    }
}

document.addEventListener('keydown',(Event)=>{
    if(Event.key === 'Enter' && search_input.value != '' && search_input.id == 'search-input'){ 
        fetchData(search_input.value);
      Event.preventDefault();
    }
});

search_btn.addEventListener('click' , (Event)=>{
    if(search_input.value != '' && search_input.id == 'search-input'){
        fetchData(search_input.value);
        Event.preventDefault();
    }
});



