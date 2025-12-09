# Advanced Weather App — Starter


## Overview
This is a PWA-ready starter for an advanced weather website using HTML, JavaScript and JSON data from OpenWeatherMap.


## Setup
1. Get an API key from https://openweathermap.org/api.
2. Replace `YOUR_API_KEY_HERE` in `app.js` with your key.
3. Serve the folder (e.g., `npx http-server` or using the VSCode Live Server).
4. Open in browser. Grant geolocation if requested.


## Notes
- The app attempts to use the One Call API for consolidated current/hourly/daily data. If you don't have One Call access, the code falls back to `weather` + `forecast` endpoints.
- Charting uses Chart.js via CDN.
- Service worker caches assets and attempts network-first for API calls.


## Deploy
- Host on GitHub Pages, Netlify, or Vercel. For PWA features, serve over HTTPS.


## Extending the project
- Add icons (in `/icons`) and tweak `manifest.json`.
- Use SVG weather icons (e.g., https://openweathermap.org/weather-conditions) or a library like Skycons.
- Add search suggestions (typeahead) using a city dataset or a geocoding API.