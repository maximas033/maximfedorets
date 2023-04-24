firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // document.getElementById("gName").innerHTML = ("Welcome " + user.displayName)
  } else {
    //USER IS SIGNED OUT
  }
});

//WHEN LOGIN BUTTON IS PRESSED...
function personalLogin(event) {
  event.preventDefault();
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      //HANDELING ERRORS
      console.log("Error signing in,", error.message);
      document.getElementById("errorMessage").innerHTML = error.message;
      document.getElementById("errorMessage").style.color = "red";
      setTimeout(function () {
        document.getElementById("errorMessage").innerHTML = "";
      }, 3000);
    })
    .then(function (user) {
      if (user != null && email === "max.personal9@gmail.com") {
        window.location = "admin.html";
      }
    });

  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // SIGN-OUT SUCCESSFULL
        window.location = "index.html";
      })
      .catch(function (error) {
        //AN ERROR HAPPENED SIGNING OUT
      });
  }
}
