// get a current date
var date = new Date();
// get the current month
var month = date.getMonth() + 1;
// get the current day
var day = date.getDate();
// get the current year
var year = date.getFullYear();
// display the current date

document.getElementById("currentDATTE").innerHTML = month + "/" + day + "/" + year;