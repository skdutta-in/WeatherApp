/* Advanced Weather App - app.js
Features:
- Search by city/zipcode
- Geolocation
- Unit switching (metric/imperial)
- 7-day forecast + hourly chart (Chart.js)
- Favorites (localStorage)
- Auto-update toggle
- PWA support + offline caching (sw.js)


IMPORTANT: Add your API key below:
*/


const OPENWEATHER_API_KEY = "4116627150616157193796ed6cf75ed0"; // <- REPLACE
const DEFAULT_CITY = "Kolkata";


// Elements
const searchEl = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const unitsSelect = document.getElementById('units');
const currentSection = document.querySelector('.current');
const forecastGrid = document.getElementById('forecastGrid');
const tempChartCtx = document.getElementById('tempChart').getContext('2d');
const favoritesList = document.getElementById('favorites');
const saveFavBtn = document.getElementById('saveFav');
const autoUpdateCheckbox = document.getElementById('autoUpdate');


let state = {
coords: null,
units: localStorage.getItem('units') || 'metric',
current: null,
forecast: null,
chart: null,
autoUpdateTimer: null,
};


unitsSelect.value = state.units;


// Utilities
function k2c(k){return k - 273.15}
function fmtTemp(t){return (state.units === 'metric') ? `${Math.round(t)}°C` : `${Math.round(t)}°F`}


// Build display
function renderCurrent(data){
currentSection.innerHTML = '';
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
<div class="title">
<div>
<h2>${data.name || data.location}</h2>
<div class="muted">${data.weather[0].description}</div>
</div>
<div>
<div style="font-size:2rem">${Math.round(data.temp)}°</div>
<div class="muted">Feels like ${Math.round(data.feels_like)}°</div>
</div>
</div>
<div style="margin-top:.5rem;display:flex;gap:1rem;flex-wrap:wrap">
<div>Humidity: ${data.humidity}%</div>
<div>Wind: ${data.wind_speed} ${state.units === 'metric' ? 'm/s' : 'mph'}</div>
<div>Pressure: ${data.pressure} hPa</div>
</div>
`;
currentSection.appendChild(card);
}


function renderForecast(daily){
forecastGrid.innerHTML = '';
daily.forEach(day => {
const el = document.createElement('div');
el.className = 'day';
const dt = new Date(day.dt * 1000);
el.innerHTML = `
<div>${dt.toLocaleDateString()}</div>
<div style="font-weight:600">${Math.round(day.temp.day)}°</div>
<div class="muted">${day.weather[0].main}</div>
`;
})();
