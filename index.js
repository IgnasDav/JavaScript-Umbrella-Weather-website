"use strict";
//Global variables
let videoIndex = 0;
const videoEl = document.createElement("video");
const rightArrow = document.createElement("img");
const leftArrow = document.createElement("img");
const main = selectEl(".main");
const videoClass = document.createElement("div");
const videoForecast = document.createElement("div");
let forecastCity = document.createElement("div");
let forecastCurrentTemp = document.createElement("div");
let forecastWind = document.createElement("div");
let forecastMain = document.createElement("div");
const cards = document.createElement("div");
const error = document.createElement("h2");
const DATA_KEY = "data";
const aboutDiv = document.createElement("div");
const contactsDiv = document.createElement("div");

//Adding clases
error.classList.add("main__cards__error");

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
aboutDiv.classList.add("about");
aboutDiv.textContent =
  "This page was created as graduation work for JavaScript course";
contactsDiv.classList.add("contact");
contactsDiv.innerHTML = `My contacts <a href = "https://github.com/IgnasDav"> My Github<br> </a> <a href = "https://www.linkedin.com/in/ignas-davulis-883818223/"> My LinkedIn</a`;

//Appending classes
main.append(cards);
//Nav button

selectEl(".nav__btn").addEventListener("click", () => {
  selectEl(".nav__list").classList.toggle("hidden");
});
const darkMode = [{ darkMode: true }];
let newArr = [];
let arr = [];
const imgArr = [
  {
    src: "https://cdn-icons-png.flaticon.com/512/116/116251.png",
    alt: "Rain with Clouds",
    name: "Rain",
  },
  {
    src: "http://cdn.onlinewebfonts.com/svg/img_171.png",
    alt: "Clouds",
    name: "Clouds",
  },
  {
    src: "https://www.holidify.com/images/logos/weather-icons/clear-day.svg",
    alt: "Clear",
    name: "Clear",
  },
  {
    src: "https://cdn2.iconfinder.com/data/icons/weather-170/32/haze-512.png",
    alt: "Mist",
    name: "Mist",
  },
];
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
function selectEl(element) {
  return document.querySelector(element);
}
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

selectEl(".main__form__btn").addEventListener("click", (event) => {
  event.preventDefault();
  if (selectEl("#search").value === "") {
    error.innerHTML = "Empty or wrong value";
    selectEl(".main__form").append(error);
  } else {
    error.remove();
    fetchData();
  }
});
function renderCard() {
  cards.innerHTML = null;
  if (Array.isArray(arr)) {
    arr.forEach((item, i) => {
      const img = document.createElement("img");
      const temp = document.createElement("div");
      const city = document.createElement("div");
      const wind = document.createElement("div");
      const weatherCode = document.createElement("div");
      const card = document.createElement("div");
      const favorite = document.createElement("div");
      const deleteBtn = document.createElement("div");
      card.draggable = true;
      img.draggable = false;
      favorite.classList.add("main__cards__card__fav");
      deleteBtn.classList.add("main__cards__card__delete");
      favorite.innerHTML = `<i class="far fa-star"></i>`;
      img.classList.add("main__cards__card__img");
      card.id = "card";
      card.append(img, weatherCode, city, temp, wind, favorite, deleteBtn);
      cards.append(card);
      card.classList.add("main__cards__card");
      temp.textContent = item.temp;
      city.textContent = item.city;
      deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
      wind.innerHTML = `${item.wind} <i class="fas fa-wind"></i>`;
      card.slot = i;
      weatherCode.textContent = item.weatherCode;

      if (weatherCode.textContent === "Rain") {
        img.src = imgArr[0].src;
        img.alt = imgArr[0].alt;
      }
      if (weatherCode.textContent === "Clouds") {
        img.src = imgArr[1].src;
        img.alt = imgArr[1].alt;
      }
      if (weatherCode.textContent === "Clear") {
        img.src = imgArr[2].src;
        img.alt = imgArr[2].alt;
      }
      if (weatherCode.textContent === "Mist") {
        img.src = imgArr[3].src;
        img.alt = imgArr[3].alt;
      }
      favorite.addEventListener("click", () => {
        const className = item.favorite ? "fas" : "far";
        item.favorite = !item.favorite;
        favorite.innerHTML = `<i class="${className} fa-star"></i>`;

        if (item.favorite) {
          window.localStorage.setItem(DATA_KEY, JSON.stringify(arr));
        }
      });

      deleteBtn.addEventListener("click", () => {
        arr.splice(i, 1);
        window.localStorage.setItem(DATA_KEY, JSON.stringify(arr));
        renderCard();
      });
    });
  }
  //Drag functionality
  document.querySelectorAll(".main__cards__card").forEach((card, i) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    card.addEventListener("dragover", dragOver);
    card.addEventListener("dragenter", dragEnter);
    card.addEventListener("dragleave", dragLeave);
    card.addEventListener("drop", dragDrop);

    function dragDrop(e) {
      e.preventDefault();

      arr.splice(0, 0, arr.splice(i, 1)[0]);

      renderCard();
    }
  });

  //Drag functionality functions
  function dragStart() {
    setTimeout(() => this.classList.add("invisible"), 0);
  }
  function dragOver(e) {
    // console.log(e);
    e.preventDefault();
  }
  function dragEnd() {
    this.classList.remove("invisible");
  }
  function dragEnter() {}
  function dragLeave() {}
  function dragDrop(e) {
    if (e.target.innerHTML != card.innerHTML) {
      // console.log(i);
      console.log(card);
      //Call render card function by switching up the items in the array
    }
  }
}

//Adding draggability

function fetchData() {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      selectEl("#search").value
    }&appid=06c40b664273d82a56d487ca67529fb8`
  )
    .then((response) => {
      return response.json();
    })
    .then(
      (result) => {
        const value = selectEl("#search").value;
        if (
          arr.some((item) => {
            return item.city.toLowerCase() === value.toLowerCase();
          })
        ) {
          error.innerHTML = "There is a card with that name";
          selectEl(".main__form").append(error);
        } else {
          error.remove();
          arr.push({
            favorite: false,
            temp: `${(Number(result.main.temp) - 273.15).toFixed()} °C`,
            city: `${result.name}`,
            wind: `Wind ${result.wind.speed} M/S `,
            weatherCode: `${result.weather[0].main}`,
          });
          renderCard();
        }
      }
      // .catch((err) => {
      //   const error = document.createElement("h2");
      //   error.innerHTML = "Wrong City name";
      //   document.querySelector(".main__form").append(error);
      // });
    );
}
window.addEventListener("DOMContentLoaded", () => {
  const storedArr = window.localStorage.getItem(DATA_KEY);
  if (storedArr.length >= 2) {
    arr = JSON.parse(storedArr);
    renderCard();
  }
});

function toggleDarkMode() {
  selectEl("header").classList.toggle("header--dark-mode");
  selectEl("main").classList.toggle("main--dark-mode");
  selectEl(".main__form__btn").classList.toggle("main__form__btn--dark-mode");
  selectEl(".main__form__search").classList.toggle(
    "main__form__search--dark-mode"
  );

  selectEl(".main__cards__card").classList.toggle(
    "main__cards__card--dark-mode"
  );
}
function removeDarkMode() {
  selectEl("header").classList.add("header--dark-mode");
  selectEl("main").classList.add("main--dark-mode");
  selectEl(".main__form__btn").classList.add("main__form__btn--dark-mode");
  selectEl(".main__form__search").classList.add(
    "main__form__search--dark-mode"
  );

  selectEl(".main__cards__card").classList.add("main__cards__card--dark-mode");
}
selectEl(".slider.round").addEventListener("click", (e) => {
  darkMode[0].darkMode = !darkMode[0].darkMode;
  if (darkMode[0].darkMode) {
    toggleDarkMode();
  }
  if (!darkMode[0].darkMode) {
    removeDarkMode();
  }
});
//Creating about and infor pages
function hideMain() {
  main.classList.add("hidden");
}
function addMain() {
  main.classList.remove("hidden");
}

selectEl(".item--1").addEventListener("click", () => {
  addMain();
  if (selectEl(".contact") || selectEl(".about")) {
    selectEl(".contact").remove();
    selectEl(".about").remove();
  }
});
selectEl(".item--2").addEventListener("click", () => {
  hideMain();
  if (selectEl(".contact")) {
    selectEl(".contact").remove();
  }
  selectEl("body").append(aboutDiv);
});
selectEl(".item--3").addEventListener("click", () => {
  hideMain();

  if (selectEl(".about")) {
    selectEl(".about").remove();
  }
  selectEl("body").append(contactsDiv);
});
