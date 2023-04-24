function GetTime() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("Displaytime").innerText = `${time}`;
}
window.onload = GetTime();
setInterval(GetTime, 1000);

function displayQuotes() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const randomIndex = Math.floor(Math.random() * data.length); // Select a random index from the data array
      const randomQuote = data[randomIndex]; // Use the random index to select a random quote object
      document.getElementById("quote").innerHTML = randomQuote.text; // Display the text property of the random quote object on the page
      document.getElementById("quote").style.fontWeight = "lighter";
    });
}

window.onload = displayQuotes;
