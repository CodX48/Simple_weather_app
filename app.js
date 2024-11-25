const  APIKey = "6a12c5971cfe1cea9fa803c16afe3b52"
const search_input = document.querySelector('.search-input');
const search_btn = document.getElementById('search_btn');
const temp  = document.querySelector('.current-weather-info p');
const city_name = document.querySelector('.current-weather-info h1');
const date = document.querySelector('.current-weather-info span');
const icon = document.querySelector('.current-weather img');
const more_info = document.querySelectorAll('.more-info div');
const comming_hours = document.querySelector('.comming-hours');
const weather_cond = document.getElementById('weather_cond');

async function getFeachData(type,city) {
    return (await fetch(`https://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${APIKey}&units=metric`)).json()
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
        if(Event.key === 'Enter' && search_input.value != ''){ 
          UpdateWeather(search_input.value);
          Comming_hours_list(search_input.value);
          Event.preventDefault();
        }
    });

    search_btn.addEventListener('click' , (Event)=>{
        if(search_input.value != ''){
            UpdateWeather(search_input.value);
            Comming_hours_list(search_input.value);
            Event.preventDefault();
        }
    });

    function comming_hours_comp(data){
        
        comming_hours.innerHTML = "";
        for(let i = 0 ; i < 10 ;i++){
        comming_hours.innerHTML += `
        <div>
        <p>${`${data.list[i].dt_txt}`.split(" ")[1].split(":")[0]}</p>
        <img src="${GetWeatherIcon(data.list[i].weather[0].id)}" alt="">
        <p>${Math.round(data.list[i].main.temp)}°C</p>
        </div>`
        }
    }

    

    async function Comming_hours_list(city){
        try{
            const Data = await getFeachData("forecast",city);
            if(Data.cod == 200){
                comming_hours_comp(Data);
                //console.log(Data.list);
            }else{
                throw "the page can't be found"
            }
        }catch(err){
            console.error(err)
        }
    }


async function UpdateWeather(city) {
    try {
        const Data = await getFeachData("weather",city);
        if(Data.cod == 200){
            city_name.textContent = Data.name;
            temp.textContent = `${Math.round(Data.main.temp)}° / ${Math.floor(Data.main.temp_min)}°`;
            date.textContent = currentDate();
            more_info[0].children[1].textContent = `${Math.round(Data.main.feels_like)}°C`
            more_info[1].children[1].textContent =  `${Math.round(Data.wind.speed)} m/s`
            icon.src = GetWeatherIcon(Data.weather[0].id);
            weather_cond.textContent = Data.weather[0].description;
            console.log(Data);

            
        }else{
            throw "the page can't be found"
        }
        }catch(err){
        console.error(err)
    }
}



