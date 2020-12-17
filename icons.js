/**Entering Icons */
/** Array with the icons */

var iconArray = new Array();

iconArray[0] = new Image();
iconArray[0].src = "../Images/black-white/svenska.png";

iconArray[1] = new Image();
iconArray[1].src = "../Images/black-white/sport.png";

iconArray[2] = new Image();
iconArray[2].src = "../Images/black-white/calculator.png";

iconArray[3] = new Image();
iconArray[3].src = "../Images/black-white/chemistry.png";

iconArray[4] = new Image();
iconArray[4].src = "../Images/black-white/eng.png";

iconArray[5] = new Image();
iconArray[5].src = "../Images/black-white/geo.png";

iconArray[6] = new Image();
iconArray[6].src = "../Images/black-white/history.png";

iconArray[0] = new Image();
iconArray[0].src = "../Images/black-white/palette.png";

/** creating Div to hold selection and button */
function addIcons(timetable, indexNr) {
  let iconDiv = document.createElement("div");
  iconDiv.setAttribute("class", "iconDivChoice");

  /** creating selection*/
  let iconSelection = document.createElement("select");
  iconSelection.setAttribute("id", "iconSelection-" + indexNr);
  iconSelection.setAttribute("class", "iconSelection");

  /** creating option */
  for (let i = 0; i < iconArray.length; i++) {
    let option = document.createElement("option");
    option.value = iconArray[i];
    selector.appendChild(option);
  }
  /**creating button */
  let button = document.createElement("button");
  button.setAttribute("id", "iconButton-" + indexNr);
  button.setAttribute("class", "IconButton");
  button.textContent = "pick";
  timetable.setAttribute("id", "eventTextId-" + indexNr);
  iconDiv.appendChild(selector);
  iconDiv.appendChild(button);
  timetable.parentNode.insertBefore(iconDiv, timetable.previousSibling);
}

/**function to set icon to right time in timetable*/
function iconTime(hour, todayDateId) {
  for (let i = 0; i < hour.length; i++) {
    let iconButton = document.getElementById("iconButton" + i);
    iconButton.addEventListener("click", function () {
      let icon = document.getElementById("iconSelection-" + i).value;
      if (icon !== "") {
        let setIcon = document.getElementById("eventTextId-" + i);
        setIcon = ""; //????
        for (let j = 0; j < iconArray.length; j++) {
          localStorage.setItem(todayDateId + "-" + i + "-" + iconArray[j]);
        }
        setIcon = icon; //??????
        localStorage.setItem(todayDateId + "-" + i + "-" + icon, icon);
      }
      if (icon === "") {
        document.getElementById("eventTextId-" + i).style.backgroundColor =
          "white"; //???
        for (let j = 0; j < iconArray.length; j++) {
          localStorage.removeItem(todayDateId + "-" + i + "-" + iconArray[j]);
        }
      }
    });
  }
}
/** Keeps the icon visebly even when we return to calender and re enter day */
function keepIconActive(pickedDay) {
  if (localStorage.length > 0) {
    let storedDaysArray = [];
    let storedYear = [];
    let storedMonth = [];
    let storedDay = [];
    let storedIndex = [];
    let storedIcon = [];
    for (let i = 0; i < localStorage.length; i++) {
      storedDaysArray[i] = localStorage.key(i);
    }

    for (let j = 0; j < storedDaysArray.length; j++) {
      if (storedDaysArray[j].length > 14) {
        /*Varför 14???*/ let = tempYear = "";
        for (let k = 0; k < 4; k++) {
          tempYear += storedDaysArray[j].charAt(k);
        }
        storedYear[j] = tempYear;

        function
      }
    }
  }
}

iconTime(hour, todayDateId);
