"use strict";
//Global variables
let videoIndex = 0;
const videoEl = document.createElement("video");
const rightArrow = document.createElement("img");
const leftArrow = document.createElement("img");
const main = document.querySelector(".main");
const videoClass = document.createElement("div");
const videoForecast = document.createElement("div");
let forecastCity = document.createElement("div");
let forecastCurrentTemp = document.createElement("div");
let forecastWind = document.createElement("div");
let forecastMain = document.createElement("div");
const cards = document.createElement("div");

//Adding clases
cards.classList.add("main__cards");
videoClass.classList.add("main__video");
rightArrow.classList.add("main__arrow--right");
leftArrow.classList.add("main__arrow--left");
rightArrow.src = "/img/arrow-right.png";
leftArrow.src = "/img/arrow-left.png";
videoForecast.classList.add("main__video__forecast");
forecastCity.classList.add("main__video__forecast__city");
forecastCurrentTemp.classList.add("main__video__forecast__currentTemp");
forecastWind.classList.add("main__video__forecast__wind");
forecastMain.classList.add("main__video__forecast__main");

//Appending classes
main.append(cards);
//Nav button

document.querySelector(".nav__btn").addEventListener("click", () => {
  document.querySelector(".nav__list").classList.toggle("hidden");
});

const videoArr = [
  {
    name: "Berlin",
    alt: "Berlin Timelapse",
    src: "https://storage.coverr.co/videos/qSlN3Q01z1L00Aww00ho2yKtZoKh5TPAQn01?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM0ODIwOTMwfQ.rHkP7RJkxnTRbDTe8ktDY7dLXTdtNg8IrBrsXDcV3rc",
  },
  {
    name: "Paris",
    alt: "Paris Timelapse",
    src: "https://storage.coverr.co/videos/n01OLEAWnQKC6DincaimOgq1b01UnimlBp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM0ODIwNjY2fQ.OzHWyF8ew77e7EViZ64IK4QlyjowUbF0D8FGrXWqdJc",
  },
  {
    name: "New York",
    alt: "New York Timelapse",
    src: "https://storage.coverr.co/videos/SLAoXubgB01d01Q2U4Y8NqqTbLP02wrJkEu?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM0ODIwNTc3fQ.ojZsUYzulMo7YrvAxE-IkBQ--6Zh2F6ObSetikuxt0g",
  },
  {
    name: "Vilnius",
    alt: "Vilnius Timelapse",
    src: "https://storage.coverr.co/videos/CGbP00DQOqnWMZRnj01tMZrS57PEvmELOU?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM0ODIwODE5fQ._Q0SqBVOPOmFi8w0nJyUlkd9-uTUWmYpo7WSk84BgOo",
  },
  {
    name: "Toronto",
    alt: "Toronto Timelapse",
    src: "https://storage.coverr.co/videos/2UF3mTty2vsAXbIPxLH5vZ1cIQyYyCza?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjM0ODIxMDIyfQ.K53gX22g_gxsK5xuwlfji8P-leD-mxygB73j0ZdC_fA",
  },
];

//Making video slides
function swipingRight() {
  videoIndex === 4 ? (videoIndex = 0) : videoIndex++;
  videoEl.src = videoArr[videoIndex].src;
}
function swipingLeft() {
  videoIndex === 0 ? (videoIndex = 4) : videoIndex--;
  videoEl.src = videoArr[videoIndex].src;
}

function drawForecast() {
  //Creating Elements
  videoForecast.append(
    forecastCity,
    forecastCurrentTemp,
    forecastWind,
    forecastMain
  );
  videoClass.prepend(videoForecast);
  //Adding Forecasts to the video
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${videoArr[videoIndex].name}&appid=06c40b664273d82a56d487ca67529fb8`
  )
    .then((response) => {
      return response.json();
    })
    .then(
      (result) => (
        (forecastCity.textContent = `${result.name}`),
        (forecastCurrentTemp.textContent = `${(
          Number(result.main.temp) - 273.15
        ).toFixed()} °C`),
        (forecastWind.innerHTML = `Wind M/S ${result.wind.speed}  <i class="fas fa-wind"></i> `),
        (forecastMain.textContent = `${result.weather[0].main}`)
      )
    );
}
drawForecast();
videoArr.forEach((singleVideo) => {
  //Creating elements
  videoEl.classList.add("main__video__mp4");
  videoClass.append(videoEl);
  main.prepend(videoClass);
  //Setting attributes

  videoEl.alt = singleVideo.alt;
  videoEl.autoplay = true;
  videoEl.loop = true;
  videoEl.src = singleVideo.src;
  videoEl.type = "video/mp4";
  videoClass.append(rightArrow, leftArrow);
});
//Adding event listener
rightArrow.addEventListener("click", () => {
  swipingRight();
  drawForecast();
});
leftArrow.addEventListener("click", () => {
  swipingLeft();
  drawForecast();
});

document
  .querySelector(".main__form__btn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    renderCard();
  });

function renderCard() {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      document.querySelector("#search").value
    }&appid=06c40b664273d82a56d487ca67529fb8`
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //Creating cards
      const card = document.createElement("div");
      const temp = document.createElement("div");
      const city = document.createElement("div");
      const wind = document.createElement("div");
      const weatherCode = document.querySelector("div");
      card.append(city, temp, weatherCode, wind);
      city.textContent = `${result.name}`;
      temp.textContent = `${(Number(result.main.temp) - 273.15).toFixed()} °C`;
      weatherCode.textContent = `${result.weather[0].main}`;
      wind.innerHTML = `Wind M/S ${result.wind.speed}  <i class="fas fa-wind"></i> `;
      card.classList.add("main__card");
      cards.append(card);
    });
  // .catch((err) => {
  //   const error = document.createElement("h2");
  //   error.innerHTML = "Wrong City name";
  //   document.querySelector(".main__form__btn").append(error);
  // });
}
