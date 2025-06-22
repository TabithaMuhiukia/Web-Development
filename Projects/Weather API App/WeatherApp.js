const cityInput = document.getElementById('cityInput')
const searchButton = document.getElementById('searchButton')

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');



const apikey = '77d8319438dd02c0436e554a638d2a5d'
searchButton.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo()
        cityInput.value = '' // Clear the input field after search
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && 
        cityInput.value.trim() != ''
    ) {
        updateWeatherInfo()
        cityInput.value = '' // Clear the input field after search
        cityInput.blur()
        }
})
async function getfetchData(endpoint, city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiurl);
    return response.json();
}

function getWeatherIcon(id) {
function getWeatherIcon(id) {
    if (id <= 232) return 'weather/thunderstorm.svg';
    if (id <= 321) return 'weather/drizzle.svg';
    if (id <= 531) return 'weather/rain.svg';
    if (id <= 622) return 'weather/snow.svg';
    if (id <= 781) return 'weather/atmosphere.svg';
    if (id === 800) return 'weather/clear.svg';
    return 'weather/clouds.svg';
}
function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    };
    return currentDate.toLocaleDateString('en-GB', options);
}
async function updateWeatherInfo() {
    const city = cityInput.value.trim();
    const weatherData = await getfetchData('weather', city);

    if (weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    console.log(weatherData);
    const { name: country, main: { temp, humidity }, weather, wind: { speed } } = weatherData;
    const { id, main } = weather[0];

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '°C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'm/s';

    currentDateTxt.textContent = getCurrentDate();
    console.log(getCurrentDate());
    weatherSummaryImg.src = getWeatherIcon(id);

    await updateForecastingInfo(city);
    showDisplaySection(weatherInfoSection);
}
async function updateForecastingInfo() {
    const forecastData = await getfetchData('forecast','city')
    console.log(forecastData)
async function updateForecastingInfo(city) {
    const forecastData = await getfetchData('forecast', city);
    console.log(forecastData);
}
    [weatherInfoSection, notFoundSection, searchCitySection]
function showDisplaySection(section) {
    [weatherInfoSection, notFoundSection, searchCitySection]
        .forEach(sec => sec.style.display = 'none');

    section.style.display = 'flex';
}