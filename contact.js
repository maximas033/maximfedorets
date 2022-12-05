document.getElementsByClassName("name").value
document.getElementsByClassName("email").value
document.getElementsByClassName("message").value

// function that will clear the values
function clearValues() {
    // wait 1 second
    setTimeout(function() {
    document.getElementsByClassName("name").value = "";
    document.getElementsByClassName("email").value = "";
    document.getElementsByClassName("message").value = "";
    }, 1000);
}
