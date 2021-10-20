"use strict";

document.querySelector(".nav__btn").addEventListener("click", () => {
  document.querySelector(".hidden").classList.toggle;
});

//Fetching data
// fetch(
//   "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=06c40b664273d82a56d487ca67529fb8"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => console.log("result", result));
// fetch(
//   "http://api.openweathermap.org/data/2.5/weather?q=London&appid=06c40b664273d82a56d487ca67529fb8"
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => console.log("result", result));
