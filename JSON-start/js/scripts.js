//ADD the key and change units to imperial
const apiURL = "api.openweathermap.org/data/2.5/weather?id=5816861&appid=c34f810a4f43f048c6c18a7555bf8976&units=imperial"

//Go fetch it and then wait for a response.
fetch (apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
      //Once it comes back, display it to the console.

    console.log(weatherInfo);

    document.getElementById('place').innerHTML = weatherInfo.name;

    let sample = document.createElement("h1");
    sample.textContent = mydata.name;
    document.getElementById("puppy").appendChild(sample);
}); // end of .then