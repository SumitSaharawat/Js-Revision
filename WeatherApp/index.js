async function getWeather() {
    const city = document.querySelector('#city').value;
    const apiKey = 'da5cc509bc967933cf9f957a7a06eb9b';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const data = await fetch(currentWeatherUrl);
    const currData = await data.json();


    document.querySelector('#cityName').innerHTML = `${city}`;
    document.querySelector('#temperature').innerHTML = `${currData.main.temp} °C`;
    document.querySelector('#description').innerHTML = `${currData.weather[0].description}`;
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${currData.weather[0].icon}@2x.png" alt="weather icon">`;

    const forecastResponse = await fetch(forecastWeatherUrl);
    const forecastData = await forecastResponse.json();

    const forecastDays = document.querySelectorAll('.day');
        forecastDays.forEach((day, index) => {
            const forecast = forecastData.list[index * 8]; 
            const forecastIcon = forecast.weather[0].icon;
            const weekday = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });


            day.querySelector('.weekday').textContent = weekday;
            day.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="forecast icon">`;
            day.querySelector('.temp').textContent = `${Math.round(forecast.main.temp)}°C`;
        });

        const body = document.body;
        const cas = currData.weather[0].main.toLowerCase();
        body.className = '';
        console.log(cas)
        
        switch(cas){
            case 'clear':
                body.classList.add('clear');
                break;
            case 'clouds':
                body.classList.add('clouds');
                break;
            case 'rain':
                body.classList.add('rain');
                break;
            case 'snow':
                body.classList.add('snow');
                break;
            default:
                body.classList.add('default');
        }

}