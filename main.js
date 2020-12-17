'use strict';

const date = new Date();
//Variable year håller constructor function Date() =2020 aktuellt år
let currentYear = date.getFullYear();
// Ger månadernas indexnummer 0-11. +1 gör att månaderna får det värde som behövs i andra uträkningar.
let monthModified = date.getMonth() + 1;
let dateToday = date.getDate();
let thisMonth = date.getMonth();
let monthHeader = document.querySelector('.date h1');
let navmonth = document.querySelectorAll('.changeMonth');
let changeYear = document.getElementsByClassName('changeYear');
let yearHeader = document.getElementById('year');
let reset = document.querySelector('.reset');

let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

//flyttade ut staffans element då jag behöver tillgång i changeYear
let element = document.getElementById('days-number-id');

//functionen tilldelar värdet i currentYear till id "year" i index.html
function showCalender() {
	let yearP = document.getElementById('year');
	yearP.innerHTML = currentYear;
}

//skapat en knapp som återställer datum
//till nuvarnde
reset.addEventListener('click', function() {
	window.location.reload();
});

/* function resetButton() {
  window.location.reload();
  //let test = document.getElementById("year");
  //test.innerHTML = currentYear;
  //monthHeader.innerHTML = months[thisMonth];
} */

//ändra år
changeYear[0].addEventListener('click', function() {
	currentYear--;
	element.innerHTML = '';
	showCalanderDays();
	hoverWindow();
	yearHeader.innerHTML = currentYear;
});
changeYear[1].addEventListener('click', function() {
	currentYear++;
	element.innerHTML = ''; //nollställer kalendernumrena
	showCalanderDays();
	hoverWindow();
	yearHeader.innerHTML = currentYear;
});

//ändrar månader
navmonth[0].addEventListener('click', function() {
	if (thisMonth !== 0) {
		thisMonth--;
		monthModified = thisMonth + 1;
		element.innerHTML = '';
		showCalanderDays();
		hoverWindow();
	} else {
		thisMonth = 11;
		currentYear--;

		monthModified = thisMonth + 1;
		element.innerHTML = '';
		showCalanderDays();
		hoverWindow();
		yearHeader.innerHTML = currentYear;
	}
	monthHeader.innerHTML = months[thisMonth];
});

navmonth[1].addEventListener('click', function() {
	if (thisMonth !== 11) {
		thisMonth++;
		monthModified = thisMonth + 1;
		element.innerHTML = '';
		showCalanderDays();
		hoverWindow();
	} else {
		thisMonth = 0;
		currentYear++;

		monthModified = thisMonth + 1;
		element.innerHTML = '';
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

function showCalanderDays() {
	// Finds out which index the first day of the week has, 0 = Sunday.
	function day() {
		return new Date(currentYear + '-' + monthModified + '-01').getDay();
	}

	// Creates a div for each day (the numbers) and assigns them an ID number and content
	function daysToCalendar(dayId, text) {
		let newDiv = document.createElement('div');
		newDiv.setAttribute('id', dayId);
		let textInDiv = document.createTextNode(text);
		newDiv.appendChild(textInDiv);
		element.appendChild(newDiv);
	}

	// Generates the blank days in the calendar so that the 1:st is on right weekday
	function blankDaysId(dayId) {
		return 'last-month-day-id' + dayId;
	}
	// If the first day of the month is a Sunday.
	if (day() === 0) {
		for (let index = 0; index < 6; index++) {
			daysToCalendar(blankDaysId([ index ]), ' ');
		}
	} else {
		for (let index = day(); index > 1; index--) {
			daysToCalendar(blankDaysId([ index ]), ' ');
		}
	}

	// Creates all days of the month (number)
	for (let index = 1; index <= totalDaysInMonthFunc(monthModified, currentYear); index++) {
		let dayNumberId = 'this-number-id' + [ index ];
		daysToCalendar(dayNumberId, [ index ]);
	}
	// Mark today's day
	if (date.getFullYear() === currentYear && date.getMonth() === thisMonth) {
		document.getElementById('this-number-id' + dateToday).style.backgroundColor = 'red';
		document.getElementById('this-number-id' + dateToday).style.cursor = 'pointer';
	}

	// Mark days that got an event by divide local storage Key into useful data
	if (localStorage.length > 0) {
		let storedDaysArray = [];
		for (let i = 0; i < localStorage.length; ++i) {
			storedDaysArray[i] = localStorage.key(i);
		}
		let storedYear = [];
		let storedMonth = [];
		let storedDay = [];
		for (let x = 0; x < storedDaysArray.length; x++) {
			if (storedDaysArray[x].length < 14) {
				let tempYear = '';
				for (let z = 0; z < 4; z++) {
					tempYear += storedDaysArray[x].charAt(z);
				}
				storedYear[x] = tempYear;

				let tempMonth = '';
				for (let y = 5; y < 7; y++) {
					if (storedDaysArray[x].charAt(y) !== '-') tempMonth += storedDaysArray[x].charAt(y);
				}
				storedMonth[x] = tempMonth;

				let tempDay = '';
				for (let z = 8; z < 10; z++) {
					if (storedDaysArray[x].charAt(z) !== '-') tempDay += storedDaysArray[x].charAt(z);
				}
				storedDay[x] = tempDay;
			}
			for (let a = 0; a < storedYear.length; a++) {
				if (currentYear == storedYear[a] && thisMonth == storedMonth[a]) {
					document.getElementById('this-number-id' + storedDay[a]).style.color = 'darkOrange';
				}
			}
		}
	}
}

// Generates the date in the day view
function dateToCalederDay(clicktDay) {
	let dateCalenderDay = document.getElementById('date-calender-day');
	dateCalenderDay.textContent = '';
	let textCalenderDay;
	let addZeroToMonth = monthModified;
	if (clicktDay < 10) {
		clicktDay = '0' + clicktDay;
	}
	if (monthModified < 10) {
		addZeroToMonth = '0' + monthModified;
	}
	textCalenderDay = document.createTextNode(currentYear + '-' + addZeroToMonth + '-' + clicktDay);
	dateCalenderDay.appendChild(textCalenderDay);
}
let colorsArr = [ '', 'Red', 'Green', 'Blue', 'Pink', 'Yellow' ];

function changeActivityColor(timetable, indexNr) {
	let newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'activityDiv');

	let selector = document.createElement('select');
	selector.setAttribute('id', 'selector-' + indexNr);
	selector.setAttribute('class', 'selector');

	for (let i = 0; i < colorsArr.length; i++) {
		let option = document.createElement('option');
		option.value = colorsArr[i];
		option.text = colorsArr[i];
		option.style.backgroundColor = colorsArr[i];

		selector.appendChild(option);
	}

	let button = document.createElement('button');
	button.setAttribute('id', 'button-' + indexNr);
	button.setAttribute('class', 'button');
	button.textContent = 'Select';
	timetable.setAttribute('id', 'eventTextId-' + indexNr);
	newDiv.appendChild(selector);
	newDiv.appendChild(button);
	timetable.parentNode.insertBefore(newDiv, timetable.nextSibling);
}
// Sets or remove background color on chosen day event
function colorTime(hour, todayDateId) {
	for (let i = 0; i < hour.length; i++) {
		let button = document.getElementById('button-' + i);
		button.addEventListener('click', function() {
			let color = document.getElementById('selector-' + i).value;
			if (color !== '') {
				let colorThisEvent = document.getElementById('eventTextId-' + i);
				colorThisEvent.style.backgroundColor = 'white';
				for (let j = 0; j < colorsArr.length; j++) {
					localStorage.removeItem(todayDateId + '-' + i + '-' + colorsArr[j]);
				}
				colorThisEvent.style.backgroundColor = color;
				localStorage.setItem(todayDateId + '-' + i + '-' + color, color);
			}
			if (color === '') {
				document.getElementById('eventTextId-' + i).style.backgroundColor = 'white';
				for (let j = 0; j < colorsArr.length; j++) {
					localStorage.removeItem(todayDateId + '-' + i + '-' + colorsArr[j]);
				}
			}
		});
	}
}

/*  When day event sheet is opened, divide local storage Key into useful data and compare with the date.
    If there is a match on this day, reset background color to the color that have been chosen earlier. */
function colorUpdate(thisDay) {
	if (localStorage.length > 0) {
		let storedDaysArray = [];
		let storedYear = [];
		let storedMonth = [];
		let storedDay = [];
		let storedIndex = [];
		let storedColor = [];
		for (let i = 0; i < localStorage.length; ++i) {
			storedDaysArray[i] = localStorage.key(i);
		}

		for (let x = 0; x < storedDaysArray.length; x++) {
			if (storedDaysArray[x].length > 14) {
				let tempYear = '';
				for (let z = 0; z < 4; z++) {
					tempYear += storedDaysArray[x].charAt(z);
				}
				storedYear[x] = tempYear;

				function findFunction(array, startPos, numberOfDach) {
					let find = '';
					let searchDach = 0;
					let position = startPos;

					for (let i = position; i < storedDaysArray[x].length; i++) {
						if (storedDaysArray[x].charAt(i) == '-') {
							if (numberOfDach === searchDach) {
								break;
							}
							searchDach++;
							position = i;
						}
					}

					if (searchDach === numberOfDach) {
						for (let z = position + 1; z < storedDaysArray[x].length; z++) {
							if (storedDaysArray[x].charAt(z) === '-') {
								break;
							}
							find += storedDaysArray[x].charAt(z);
						}
					}
					array[x] = find;
				}

				findFunction(storedMonth, 3, 1);
				findFunction(storedDay, 3, 2);
				findFunction(storedIndex, 3, 3);
				findFunction(storedColor, 3, 4);
			}
		}

		for (let a = 0; a < storedYear.length; a++) {
			if (currentYear == storedYear[a] && thisMonth == storedMonth[a] && thisDay == storedDay[a]) {
				document.getElementById('eventTextId-' + storedIndex[a]).style.backgroundColor = storedColor[a];
			}
		}
	}
}
/**@@@@@@@@@@@@@@@@@ ICON function @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ANNIKA */

/** Array with the icons */
var iconArray = [
	{ id: '' },
	{ id: 'svenska', path: '../Images/color/svenska.png' },
	{ id: 'idrott', path: '../Images/color/sport.png' },
	{ id: 'matte', path: '../Images/color/calc.png' },
	{ id: 'kemi', path: '../Images/color/kemi.png' },
	{ id: 'engelska', path: '../Images/color/eng.png' },
	{ id: 'geografi', path: '../Images/color/geo.png' },
	{ id: 'historia', path: '../Images/color/history.png' },
	{ id: 'bild', path: '../Images/color/palette.png' }
];

/** creating Div to hold selection and button */
function addIcons(timetable, indexNr) {
	let iconDiv = document.createElement('div');
	iconDiv.setAttribute('class', 'iconDivChoice');

	/** creating selection*/
	let iconSelection = document.createElement('select');
	iconSelection.setAttribute('id', 'iconSelection-' + indexNr);
	iconSelection.setAttribute('class', 'iconSelection');

	/** creating option */
	for (let i = 0; i < iconArray.length; i++) {
		let option = document.createElement('option');
		option.value = iconArray[i].id;
		option.text = iconArray[i].id;
		iconSelection.appendChild(option);
	}

	/**creating button */
	let button = document.createElement('button');
	button.setAttribute('id', 'iconButton-' + indexNr);
	button.setAttribute('class', 'iconButton');
	button.textContent = 'Icon';
	timetable.setAttribute('id', 'eventTextId-' + indexNr);
	iconDiv.appendChild(iconSelection);
	iconDiv.appendChild(button);
	timetable.parentNode.insertBefore(iconDiv, timetable.nextSibling);
}

/**function to set icon to right time in timetable*/
function iconTime(hour) {
	let todayDateId = document.getElementById('date-calender-day').textContent;
	for (let i = 0; i < hour.length; i++) {
		let iconButton = document.getElementById('iconButton-' + i);
		iconButton.addEventListener('click', function() {
			let icon = document.getElementById('iconSelection-' + i).value;
			let element = document.getElementById('icon-' + i);
			if (icon !== '') {
				let setIconToThisEvent = document.getElementById('eventTextId-' + i);

				if (element !== null) {
					element.remove();
				}

				for (let j = 0; j < iconArray.length; j++) {
					localStorage.removeItem(todayDateId + '-' + i + '-' + iconArray[j].id);
				}

				let iconElement = document.createElement('img');
				iconElement.setAttribute('id', 'icon-' + i);

				iconElement.src = iconArray.find((elem) => elem.id === icon).path;

				localStorage.setItem(todayDateId + '-' + i + '-' + icon, icon);

				setIconToThisEvent.parentNode.insertBefore(iconElement, setIconToThisEvent.nextSibling);
			}
			if (icon === '') {
				if (element !== null) {
					element.remove();
				}
				for (let j = 0; j < iconArray.length; j++) {
					localStorage.removeItem(todayDateId + '-' + i + '-' + iconArray[j].id);
				}
			}
		});
	}
}

/**keepIconActive updates timetable with icon images based on local storage key-value.*/
function keepIconActive() {
	let timePos = 31;
	let keys = [];

	let todayDateId = document.getElementById('date-calender-day').textContent;

	/**Collects all keys from local storage.*/
	for (let x = 0; x < localStorage.length; x++) {
		keys[x] = localStorage.key(x);
	}

	/**Loop size of timePos*/
	for (let i = 0; i < timePos; i++) {
		let item = localStorage.getItem(keys[i]);

		/**Controls that an element exists in the icon array with an id that match item */
		if (iconArray.find((elem) => elem.id === item) !== null && keys[i] !== undefined) {
			let k = keys[i].split('-');
			let storedDate = `${k[0]}-${k[1]}-${k[2]}`;
			if (storedDate === todayDateId) {
				let index = k[3]; // split the key to get the index position in timetable.
				let iconElement = document.createElement('img');
				iconElement.setAttribute('id', 'icon-' + index);
				let setIconToThisEvent = document.getElementById('eventTextId-' + index);
				let obj = iconArray.find((elem) => elem.id === item);

				if (obj !== undefined) {
					iconElement.src = obj.path;
				}

				setIconToThisEvent.parentNode.insertBefore(iconElement, setIconToThisEvent.nextSibling);
			}
		}
	}
}
/**@@@@@@@@@@@@@@@@@ ICON END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ANNIKA */

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

let hidden = document.querySelectorAll('.hidden');
let closeModal = document.querySelector('.close-modal');
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.dayHours');

function hoverWindow() {
	for (let index = 1; index <= totalDaysInMonthFunc(monthModified, currentYear); index++) {
		let click = document.querySelector(`#this-number-id${index}`);

		click.addEventListener('click', function() {
			dateToCalederDay(click.textContent);
			for (let i = 0; i < hidden.length; i++) {
				hidden[i].style.display = 'block';
				modal.innerHTML = '';
				//Events after click on a day
				for (let index = 1; index <= totalDaysInMonthFunc(monthModified, currentYear); index++) {
					modal.insertAdjacentHTML(
						'beforeend',
						'<div class=timme ><div class=eventTime ></div><div class=EventText ><div class=hour ></div></div></div>'
					);
				}

				let hour = document.getElementsByClassName('hour');
				let todayDateId = currentYear + '-' + thisMonth + '-' + click.textContent;
				let removeSymbol = document.querySelectorAll('.EventText');

				for (let index = 0; index < hour.length; index++) {
					removeSymbol[index].insertAdjacentHTML('beforeEnd', `<div class=${todayDateId} >x</div>`);

					let hide = document.getElementsByClassName(todayDateId);
					if (!localStorage.getItem(todayDateId + '-' + index)) {
						hide[index].classList.add('hidden');
					}

					hide[index].classList.add('removeInput');
					hour[index].addEventListener('dblclick', function() {
						let input = prompt('enter something');

						if (input.length > 2) {
							localStorage.setItem(todayDateId + '-' + index, input);
							hour[index].textContent = localStorage.getItem(todayDateId + '-' + index);

							hide[index].classList.remove('hidden');
						}
					});

					hour[index].textContent = localStorage.getItem(todayDateId + '-' + index);

					hide[index].addEventListener('click', function() {
						hour[index].textContent = localStorage.removeItem(todayDateId + '-' + index);
						hide[index].classList.add('hidden');
						document.getElementById('eventTextId-' + index).style.backgroundColor = 'white';
						document.getElementById('icon-' + index).remove();
						for (let j = 0; j < colorsArr.length; j++) {
							localStorage.removeItem(todayDateId + '-' + index + '-' + colorsArr[j]);
						}

						for (let j = 0; j < iconArray.length; j++) {
							localStorage.removeItem(todayDateId + '-' + i + '-' + iconArray[j].id);
						}
					});
				}

				/* for (let index = 0; index < hour.length; index++) {
          hour[index].addEventListener("click", function () {
            hour[index].textContent = localStorage.removeItem(
              todayDateId + "-" + index
            );
          });
        } */
				// handels timetable
				let timeTable = [
					'06:00',
					'06.30',
					'07:00',
					'07:30',
					'08:00',
					'08.30',
					'09:00',
					'09.30',
					'10:00',
					'10.30',
					'11:00',
					'11.30',
					'12:00',
					'12.30',
					'13:00',
					'13.30',
					'14:00',
					'14.30',
					'15:00',
					'15.30',
					'16:00',
					'16.30',
					'17:00',
					'17.30',
					'18:00',
					'18.30',
					'19:00',
					'19.30',
					'20:00',
					'20.30',
					'21:00'
				];
				for (let tt = 0; tt <= timeTable.length; tt++) {
					let timeLable = document.querySelectorAll('.eventTime');
					let event = document.querySelectorAll('.EventText');
					if (timeLable[tt] !== undefined) {
						timeLable[tt].textContent = timeTable[tt];
						changeActivityColor(event[tt], tt);
						addIcons(event[tt], tt);
					}
				}
				colorTime(hour, todayDateId);
				colorUpdate(click.textContent);
				iconTime(hour);
				keepIconActive(click.textContent);
			}
		});

		if (click.textContent != dateToday) {
			click.addEventListener('mouseover', function() {
				click.style.backgroundColor = 'green';
				click.style.cursor = 'pointer';
			});
		}

		if (click.textContent != dateToday) {
			click.addEventListener('mouseout', function() {
				click.style.backgroundColor = ' rgb(226, 226, 226)';
			});
		}
	}

	function close() {
		for (let i = 0; i < hidden.length; i++) {
			hidden[i].style.display = 'none';
		}
		element.innerHTML = '';
		showCalanderDays();
		hoverWindow();
	}

	closeModal.addEventListener('click', close);
	overlay.addEventListener('click', close);
}

hoverWindow();

//----------------------------------------------------------
//----------------------------------------------------------
//--------------------Abbas--------------------------
//----------------------------------------------------------
//----------------------------------------------------------
