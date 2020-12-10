"use strict";

const date = new Date();
//Variable year håller constructor function Date() =2020 aktuellt år
let currentYear = date.getFullYear();
// Ger månadernas indexnummer 0-11. +1 gör att månaderna får det värde som behövs i andra uträkningar.
let monthModified = date.getMonth() + 1;
let dateToday = date.getDate();
let thisMonth = date.getMonth();
let monthHeader = document.querySelector(".date h1");
let navmonth = document.querySelectorAll(".changeMonth");
let changeYear = document.getElementsByClassName("changeYear");
let yearHeader = document.getElementById("year");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//flyttade ut staffans element då jag behöver tillgång i changeYear
let element = document.getElementById("days-number-id");

//functionen tilldelar värdet i currentYear till id "year" i index.html
function showCalender() {
  let yearP = document.getElementById("year");
  yearP.innerHTML = currentYear;
}

//ändra år
changeYear[0].addEventListener("click", function () {
  currentYear--;
  element.innerHTML = "";
  showCalanderDays();
  hoverWindow();
  yearHeader.innerHTML = currentYear;
});
changeYear[1].addEventListener("click", function () {
  currentYear++;
  element.innerHTML = ""; //nollställer kalendernumrena
  showCalanderDays();
  hoverWindow();
  yearHeader.innerHTML = currentYear;
});

//ändrar månader
navmonth[0].addEventListener("click", function () {
  if (thisMonth !== 0) {
    thisMonth--;
    monthModified = thisMonth + 1;
    element.innerHTML = "";
    showCalanderDays();
    hoverWindow();
  } else {
    thisMonth = 11;
    currentYear--;

    monthModified = thisMonth + 1;
    element.innerHTML = "";
    showCalanderDays();
    hoverWindow();
    yearHeader.innerHTML = currentYear;
  }
  monthHeader.innerHTML = months[thisMonth];
});

navmonth[1].addEventListener("click", function () {
  if (thisMonth !== 11) {
    thisMonth++;
    monthModified = thisMonth + 1;
    element.innerHTML = "";
    showCalanderDays();
    hoverWindow();
  } else {
    thisMonth = 0;
    currentYear++;

    monthModified = thisMonth + 1;
    element.innerHTML = "";
    showCalanderDays();
    hoverWindow();
    yearHeader.innerHTML = currentYear;
  }
  monthHeader.innerHTML = months[thisMonth];
});

//functionen tilldelar värdet i thisMonth till classnamn "date" i index.html
monthHeader.innerHTML = months[thisMonth];

//Kallar functionen så året blir synligt
showCalender();
showCalanderDays();

// Calculates how many days there are in this month.
function totalDaysInMonthFunc(monthModified, year) {
  return new Date(year, monthModified, -0).getDate();
}

// Finds out which index the first day of the week has, 0 = Sunday.
function day() {
  return new Date(currentYear + "-" + monthModified + "-01").getDay();
}

// Creates a div for each day (the numbers) and assigns them an ID number and content
function daysToCalendar(dayId, text) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", dayId);
  let textInDiv = document.createTextNode(text);
  newDiv.appendChild(textInDiv);
  element.appendChild(newDiv);
}

function blankDaysId(dayId) {
  return "last-month-day-id" + dayId;
}
function showCalanderDays() {
  const aktivYear = date.getFullYear();
  const aktivMonth = date.getMonth();
  // If the first day of the month is a Sunday.
  if (day() === 0) {
    for (let index = 0; index < 6; index++) {
      daysToCalendar(blankDaysId([index]), " ");
    }
  } else {
    for (let index = day(); index > 1; index--) {
      daysToCalendar(blankDaysId([index]), " ");
    }
  }

  // Creates all days of the month (number)
  for (
    let index = 1;
    index <= totalDaysInMonthFunc(monthModified, currentYear);
    index++
  ) {
    let dayNumberId = "this-number-id" + [index];
    daysToCalendar(dayNumberId, [index]);
  }
  // Mark today's day
  if (date.getFullYear() === currentYear && date.getMonth() === thisMonth) {
    document.getElementById(
      "this-number-id" + dateToday
    ).style.backgroundColor = "red";
  }
}
// TODO!!!!!!!??????
// Mark the day that has an event using "this-number id+[index]"
function markDay(thisDay) {
  console.log("in funktion " + thisDay);
  document.getElementById(thisDay).style.backgroundColor = "yellow";
}

// Simulates input from the calendar sheet
/* let mark = document.getElementById("this-number-id5").id;
markDay(mark);
let mark1 = document.getElementById("this-number-id10").id;
markDay(mark1);
let mark2 = document.getElementById("this-number-id24").id;
markDay(mark2); */

// Generates the date in the day view
function dateToCalederDay(clicktDay) {
  let dateCalenderDay = document.getElementById("date-calender-day");
  dateCalenderDay.textContent = "";
  let textCalenderDay;
  let addZeroToMonth = monthModified;
  if (clicktDay < 10) {
    clicktDay = "0" + clicktDay;
  }
  if (monthModified < 10) {
    addZeroToMonth = "0" + monthModified;
  }
  textCalenderDay = document.createTextNode(
    currentYear + "-" + addZeroToMonth + "-" + clicktDay
  );
  dateCalenderDay.appendChild(textCalenderDay);
}

//
//----------------------------------------------------------
//----------------------------------------------------------
//--------------------Abbas--------------------------
//----------------------------------------------------------
//----------------------------------------------------------
// bättre att lägga till de via html direkt.....//Abbas
/* let days = [
  "Måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lördag",
  "Söndag",
];

for (let index = 0; index < days.length; index++) {
  document
    .querySelector(".weekDays")
    .insertAdjacentHTML("beforeend", `<div>${days[index]}<div/>`);
}
 */

// CLICK on a day

let hidden = document.querySelectorAll(".hidden");
let closeModal = document.querySelector(".close-modal");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".dayHours");

function hoverWindow() {
  for (
    let index = 1;
    index <= totalDaysInMonthFunc(monthModified, currentYear);
    index++
  ) {
    let click = document.querySelector(`#this-number-id${index}`);

    click.addEventListener("click", function () {
      dateToCalederDay(click.textContent); // Added by Staffan
      for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "block";
        modal.innerHTML = "";
        //Events after click on a day
        for (
          let index = 1;
          index <= totalDaysInMonthFunc(monthModified, currentYear);
          index++
        ) {
          modal.insertAdjacentHTML(
            "beforeend",
            "<div class=timme ><div class=eventTime ></div><div class=EventText ><div class=hour ></div></div></div>"
          );
        }

        let hour = document.getElementsByClassName("hour");
        let todayDateId = currentYear + "-" + thisMonth + "-" + click.textContent;

        for (let index = 0; index < hour.length; index++) {
          hour[index].addEventListener("dblclick", function () {
            let input = prompt("enter something");

            
            if (input !== null) {
              localStorage.setItem(todayDateId + "-" + index, input,);
              hour[index].textContent = localStorage.getItem(todayDateId + "-" + index);
              //let markEvent = document.getElementById("this-number-id" + click.textContent).style.border = "solid yellow 1px";


            }
          });

          hour[index].textContent = localStorage.getItem(todayDateId + "-" + index);
        }

        for (let index = 0; index < hour.length; index++) {
          hour[index].addEventListener("click", function () {
            hour[index].textContent = localStorage.removeItem(todayDateId + "-" + index);
          });
        }
        // handels timetable
        let timeTable = [
          "06:00",
          "06.30",
          "07:00",
          "07:30",
          "08:00",
          "08.30",
          "09:00",
          "09.30",
          "10:00",
          "10.30",
          "11:00",
          "11.30",
          "12:00",
          "12.30",
          "13:00",
          "13.30",
          "14:00",
          "14.30",
          "15:00",
          "15.30",
          "16:00",
          "16.30",
          "17:00",
          "17.30",
          "18:00",
          "18.30",
          "19:00",
          "19.30",
          "20:00",
          "20.30",
          "21:00",
        ];
        for (let tt = 0; tt <= timeTable.length; tt++) {
          let timeLable = document.querySelectorAll(".eventTime");
          if (timeLable[tt] !== undefined) {
            timeLable[tt].textContent = timeTable[tt];
          }
        }
      }
    });

    if (click.textContent != dateToday) {
      click.addEventListener("mouseover", function () {
        click.style.backgroundColor = "green";
      });
    }

    if (click.textContent != dateToday) {
      click.addEventListener("mouseout", function () {
        click.style.backgroundColor = " rgb(226, 226, 226)";
      });
    }
  }

  function close() {
    for (let i = 0; i < hidden.length; i++) {
      hidden[i].style.display = "none";
    }
  }

  closeModal.addEventListener("click", close);
  overlay.addEventListener("click", close);
}
hoverWindow();

//----------------------------------------------------------
//----------------------------------------------------------
//--------------------Abbas--------------------------
//----------------------------------------------------------
//----------------------------------------------------------
