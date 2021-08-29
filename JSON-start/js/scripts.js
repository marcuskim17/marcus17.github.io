const d = new Date();

const todayDayNumber = d.getDay();

const weekday = new Array[7];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

//ADD the key and change units to imperial
const apiURL = "//api.openweathermap.org/data/2.5/forecast?id=5879400&appid=c34f810a4f43f048c6c18a7555bf8976&units=imperial"

//Go fetch it and then wait for a response.
fetch (apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
      //Once it comes back, display it to the console.
    console.log(weatherInfo);

    document.getElementById("townName").textContent = weatherInfo.city.name;

    let mylist = weatherInfo.list;

      let forecastDayNaumber = todayDayNumber;

      for (i = 0; i < mylist.length; i++) {

        let time = mylist[i].dt_txt;

        if (time.includes("21:00:00")) {
          console.log("Found an entry with 21:00:00 in the time. It was report "+i+" from the mylist of 40");

          forecastDayNaumber += 1;
          if (forecastDayNaumber === 7){forecastDayNaumber - 0;}

          let theDayName = document.createElement["span"];
          theDayName.textContent = weekday[forecastDayNaumber];

          let theTemp = document.createElement["p"];
          theTemp.textContent = weatherInfo.list[i].main.temp + "\xB0";

          let iconcode = weatherInfo.list[i].weather[0].icon;
          let iconPath = "//openweathermap.org/img/w/" + iconcode + ".png";
          let theIcon = document.createElement("img");
          theIcon.src = iconPath;

          let theDay = document.createElement["div"];
          theDay.appendChild(theDayName);
          theDay.appendChild(theTemp);
          theDay.appendChild(theIcon);

          document.getElementById('weatherforcast').appendChild(theDay);

        } // end if
      }  // end for
}); // end of "then" fat arrow function
