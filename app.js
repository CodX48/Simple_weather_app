const  APIKey = "6a12c5971cfe1cea9fa803c16afe3b52"
const search_input = document.querySelector('.search-input');
const search_btn = document.getElementById('search_btn');

async function getFeachData(city) {
    return (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)).json()
    }

    document.addEventListener('keydown',(Event)=>{
        if(Event.key === 'Enter' && search_input.value != ''){ 
          UpdateWeather(search_input.value);
          Event.preventDefault();
        }
    });

    search_btn.addEventListener('click' , (Event)=>{
        if(search_input.value != ''){
            UpdateWeather(search_input.value);
            Event.preventDefault();
        }
    });

async function UpdateWeather(city) {
    try {
        const Data = await getFeachData(city);
        
        console.log(Data)
    }catch(err){
        console.error(err)
    }
}



