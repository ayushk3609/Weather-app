const city = document.querySelector('.search').value;
const btn = document.querySelector('.btn');


let weather = {
    ApiKey : "d3a196c7341ef656d592d0567e0fe58d",
    fetchWeather: function(city){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city?city:defaultCity}&units=metric&appid=${this.ApiKey}`
            ).then((result) => result.json())
            .then((data) => this.display(data));
    },
    display : function(data){
        let name = data.name;
        let country = data.sys.country;
        let temp = data.main.temp;
        let min_temp = data.main.temp_min;
        var date = new Date();
        let max_temp = data.main.temp_max;
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        let newDate =
        document.querySelector('.place').innerText = name +", "+country;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.description').innerText = description;
        document.querySelector('.date').innerText = date.toDateString();
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
        document.querySelector('.minmax').innerText = min_temp +"°C"+ "/" + max_temp + "°C";
        document.querySelector('.content').classList.remove('load');
        document.querySelector('.search').value = "";
    },
    search : function(){
        this.fetchWeather(document.querySelector('.search').value);
    }
};


btn.addEventListener('click',function (){
    weather.search();
});

document.querySelector('.search').addEventListener('keyup',function(e){
    if(e.which == 13){
        weather.search();
    }
})
