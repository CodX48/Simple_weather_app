const  APIKey = "6a12c5971cfe1cea9fa803c16afe3b52"

async function getFeachData(city) {
    return (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)).json()
    }

async function UpdateWeather(city) {
    try {
        const Data = await getFeachData(city);
        console.log(Data)
    }catch(err){
        console.error(err)
    }
}

UpdateWeather("istanbul")

