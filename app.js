import { createApi } from 'https://cdn.jsdelivr.net/npm/unsplash-js@7/+esm';

const btn = document.querySelector('.btn');

const api = createApi({
    accessKey: "taJ7drWQhWmRTTTj7j-aviBALA0lJ3qisIfAxGuLIks"
});

document.addEventListener('DOMContentLoaded', () => {
    api.photos.getRandom({ query: 'nature'})
        .then(result => {
            if (result.response ) {
                document.body.style.backgroundImage = `url(${result.response.urls.full})`;
            } else {
                console.error('No results found');
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
});

let weather = {
    apiKey: "d3a196c7341ef656d592d0567e0fe58d",
    fetchWeather: function (city) {
        const defaultCity = "New York"; // Set your default city here
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : defaultCity}&units=metric&appid=${this.apiKey}`
        ).then((result) => result.json())
        .then((data) => this.display(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    },
    display: function (data) {
        let name = data.name;
        let country = data.sys.country;
        let temp = data.main.temp;
        let min_temp = data.main.temp_min;
        var date = new Date();
        let max_temp = data.main.temp_max;
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        document.querySelector('.place').innerText = name + ", " + country;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.description').innerText = description;
        document.querySelector('.date').innerText = date.toDateString();
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector('.minmax').innerText = min_temp + "°C" + "/" + max_temp + "°C";
        document.querySelector('.content').classList.remove('load');
        document.querySelector('.search').value = "";
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search').value);
    }
};

btn.addEventListener('click', function () {
    weather.search();
});

document.querySelector('.search').addEventListener('keyup', function (e) {
    if (e.which == 13) {
        weather.search();
    }
});
