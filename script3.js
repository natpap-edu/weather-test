function fetchDataAndDisplay() {
  fetch('https://api.weather.com/v2/pws/observations/current?stationId=IALEXA90&format=json&units=m&apiKey=11af7594157a4a2baf7594157a0a2bc0')
    .then(response => response.json())
    .then(data => {
      // Process the retrieved data and update the webpage
      displayWeatherData(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function convertWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const directions1 = ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ'];
  
  const index = Math.floor((degrees % 360) / 45);
  return directions1[index];
}

function displayWeatherData(data) {
  const temperature = data.observations[0].metric.temp;
  const humidity = data.observations[0].humidity;
  const windSpeed = data.observations[0].metric.windSpeed;
  const pressure = data.observations[0].metric.pressure;
  const windDirection = data.observations[0].winddir;
  const precipitation = data.observations[0].precipRate?? 0;
  const windDirectionString = convertWindDirection(windDirection);

  const weatherDataElement = document.getElementById('weather-data');
  weatherDataElement.innerHTML = `
    <table style="margin-left:10px;padding:10px;font-family:Verdana;font-size:21px;border:4px blue double;border-radius:10px;background-color:blue">
	<tr colspan=2><td style="color:#ffffff;"><b>ΤΡΕΧΟΥΣΕΣ ΣΥΝΘΗΚΕΣ</b></td></tr>
	<tr><td style="background-color:#ffffe6;padding:5px"><b>Θερμοκρασία:</b></td><td style="padding:5px;background-color:#b3ffff"> ${temperature}°C</td></tr>    
	<tr><td style="background-color:#ffffe6"><b>Υγρασία:</b></td><td style="padding:5px;background-color:#b3ffff"> ${humidity}%</td></tr>
    <tr><td style="background-color:#ffffe6"><b>Ατμοσφαιρική πίεση:</b></td><td style="padding:5px;background-color:#b3ffff"></> ${pressure} mb</td></tr>
	<tr><td style="background-color:#ffffe6"><b>Ποσότητα βροχής:</b></td><td style="padding:5px;background-color:#b3ffff"></> ${precipitation} mm</td></tr>
	</table>
	<table style="margin-left:10px;margin-top:20px;padding:10px;font-family:Verdana;font-size:21px;border:4px blue double;border-radius:10px;background-color:blue">
	<tr colspan=2><td style="color:#ffffff"><b>ΑΝΕΜΟΣ</b></td></tr>
	<tr><td style="background-color:#ffffe6"><b>Ταχύτητα ανέμου:</b></td><td style="padding:5px;background-color:#b3ffff"> ${windSpeed} m/s</td></tr>
	<tr><td style="background-color:#ffffe6"><b>Κατεύθυνση ανέμου:</b></td><td style="padding:5px;background-color:#b3ffff"> ${windDirectionString} </td></tr>
	</table>
  `;
}

// Fetch data initially and refresh every 10 seconds
fetchDataAndDisplay();
setInterval(fetchDataAndDisplay, 300000);

