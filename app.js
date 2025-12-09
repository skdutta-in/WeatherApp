/* Advanced Weather App - app.js
}


// Fallback: fetch by city name (resolves to coords via weather endpoint)
(resolves to coords via weather endpoint)
async function fetchByName(q){
try{
const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${4116627150616157193796ed6cf75ed0}`);
if(!res.ok) throw new Error('City not found');
const root = await res.json();
const lat = root.coord.lat, lon = root.coord.lon;
await fetchByCoords(lat,lon);
}catch(err){
console.error(err);
alert('City lookup failed');
}
}


// Controls
searchBtn.addEventListener('click', ()=>fetchByName(searchEl.value || DEFAULT_CITY));
geoBtn.addEventListener('click', ()=>{
if(!navigator.geolocation) return alert('Geolocation not supported');
navigator.geolocation.getCurrentPosition(p=>{
fetchByCoords(p.coords.latitude,p.coords.longitude);
},err=>alert('Geolocation denied'));
});
unitsSelect.addEventListener('change', ()=>{
state.units = unitsSelect.value;
localStorage.setItem('units', state.units);
// re-fetch current view
if(state.coords) fetchByCoords(state.coords.latitude, state.coords.longitude, state.units);
else if(state.current?.location) fetchByName(state.current.location);
});
saveFavBtn.addEventListener('click', saveCurrentToFav);


// Auto-update
autoUpdateCheckbox.addEventListener('change', ()=>{
localStorage.setItem('auto_update', autoUpdateCheckbox.checked);
if(autoUpdateCheckbox.checked) startAutoUpdate(); else stopAutoUpdate();
});
function startAutoUpdate(){
stopAutoUpdate();
state.autoUpdateTimer = setInterval(()=>{
if(state.coords) fetchByCoords(state.coords.latitude, state.coords.longitude);
}, 10 * 60 * 1000);
}
function stopAutoUpdate(){ if(state.autoUpdateTimer) clearInterval(state.autoUpdateTimer); }


// Init
(function init(){
renderFavorites();
const storedUnits = localStorage.getItem('units');
if(storedUnits) state.units = storedUnits;
if(localStorage.getItem('auto_update') === 'true') { autoUpdateCheckbox.checked = true; startAutoUpdate(); }
// Try geolocation then default
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(p=>{
state.coords = p.coords;
fetchByCoords(p.coords.latitude,p.coords.longitude);
}, ()=>fetchByName(DEFAULT_CITY));
}else{
fetchByName(DEFAULT_CITY);
}
})();