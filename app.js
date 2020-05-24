window.addEventListener("load", () => {
  let long;
  let lat;

  const locationTimezone = document.querySelector(".timezone");
  const temperatureSection = document.querySelector(".temperature-section");
  const degree = document.querySelector(".degree");
  const description = document.querySelector(".description");
  const degreeUnit = document.querySelector(".unit");
  const weatherWeek = document.querySelector(".week");
  const currentTime = document.querySelector(".current-time");

  if (
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      function timer() {
        let timeNow = new Date();
        time = timeNow.toLocaleTimeString();
        currentTime.textContent = time;
      }

      setInterval(timer, 1000);

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          //Set weather of Full week
          const week = data.daily.data;
          let dayArray = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wesnesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          let date = new Date();
          let day = date.getDay();
          console.log(typeof day);

          for (let i = 0; i < week.length - 1; i++) {
            const dailyInWeek = document.createElement("div");
            dailyInWeek.classList.add("daily");
            const orderDay = document.createElement("h3");
            let indexDay = day + (i + 1);
            if (indexDay > 6) {
              indexDay = indexDay - 7;
            }
            orderDay.innerHTML = dayArray[indexDay];
            dailyInWeek.appendChild(orderDay);
            const tempIcon = document.createElement("canvas");
            tempIcon.classList.add(`icon-daily-${i}`);
            tempIcon.height = "30";
            tempIcon.width = "30";
            tempIcon.textContent = week[i].icon;
            dailyInWeek.appendChild(tempIcon);
            const temp = document.createElement("div");
            temp.classList.add("temperature-daily");
            const tempDegree = document.createElement("p");
            tempDegree.textContent = Math.round(
              ((week[i].temperatureMax - 32) * 5) / 9
            );
            temp.appendChild(tempDegree);
            const iconDot = document.createElement("i");
            iconDot.className = "fa fa-dot-circle";
            iconDot.style.paddingTop = "5px";
            iconDot.style.fontSize = "7px";
            temp.appendChild(iconDot);
            const tempUnit = document.createElement("span");
            tempUnit.textContent = "C";
            temp.appendChild(tempUnit);
            dailyInWeek.appendChild(temp);
            const tempDescript = document.createElement("div");
            tempDescript.classList.add("summary-daily");
            tempDescript.textContent = week[i].summary;
            dailyInWeek.appendChild(tempDescript);
            weatherWeek.appendChild(dailyInWeek);
            setIcons(week[i].icon, document.querySelector(`.icon-daily-${i}`));
          }

          const { temperature, summary, icon } = data.currently;

          //set DOM element from the API

          degree.textContent = Math.round(((temperature - 32) * 5) / 9);
          description.textContent = summary;
          locationTimezone.textContent = data.timezone;

          let Farenheit = temperature;
          //set icon

          setIcons(icon, document.querySelector(".icon"));
          changeBackground(degree.textContent);

          //change temperature to Farenheit
          temperatureSection.addEventListener("click", () => {
            if (degreeUnit.textContent === "C") {
              degreeUnit.textContent = "F";
              degree.textContent = Farenheit;
            } else {
              degreeUnit.textContent = "C";
              degree.textContent = Math.round(((temperature - 32) * 5) / 9);
            }
          });

          //SET weather in week
        });
    })
  );

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function changeBackground(currentlyDegree) {
    if (currentlyDegree >= "30") {
      document.body.style.backgroundImage =
        "linear-gradient( rgb(233, 142, 39), rgb(240, 84, 22))";
    } else if (currentlyDegree >= "25" && currentlyDegree <= "29") {
      document.body.style.backgroundImage =
        "linear-gradient( rgb(49, 245, 108), rgb(49, 245, 163))";
    } else if (currentlyDegree <= "24") {
      document.body.style.backgroundImage =
        "linear-gradient( rgb(22, 157, 247), rgb(22, 107, 247))";
    }
  }
});

const showLevel = document.querySelector(".show-level");
const level = document.querySelector(".level-note");
showLevel.addEventListener("mouseover", () => {
  level.classList.add("level-appear");
});
showLevel.addEventListener("mouseout", () => {
  level.classList.remove("level-appear");
});
