function weatherfound(){
    return ` <div class="found_weather">
                <div class="current-weather">
                    <div class="current-weather-info">
                        <h1></h1>
                        <p></p>
                        <span></span>
                    </div>
                    <div class="weather-icon">
                        <img src="" alt="">
                        <span id="weather_cond"></span>
                    </div>
                </div>
                <div class="comming-hours"></div>
                <div class="more-info">
                    <div>
                        <p>real feel</p><span>29°C</span>
                    </div>
                    <div>
                        <p>wind</p><span>0.2km/h</span>
                    </div>
                    <div>
                        <p>chance of rain</p><span>0%</span>
                    </div>
                    <div>
                        <p>UV index</p><span>5</span>
                    </div>
                </div>
            </div>`
} 

export {weatherfound}