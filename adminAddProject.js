function AddProject(event) {
  event.preventDefault();
  var clientsNAme = document.getElementById("PersonName").value;
  var projectName = document.getElementById("ProjectName").value;
  var projectStartDate = document.getElementById("ProjectStartDate").value;
  var projectEndDate = document.getElementById("ProjectDueDate").value;
  var Projectnotes = document.getElementById("Projectnotes").value;

  // check if fields are empty
  if (
    clientsNAme == "" ||
    projectName == "" ||
    projectStartDate == "" ||
    projectEndDate == "" ||
    Projectnotes == ""
  ) {
    console.log("empty fields");
    var alert = document.getElementById("alert_danger");
    alert.style.display = "block";
    alert.innerHTML = "Fill all fields up!";
    setTimeout(function () {
      document.getElementById("alert_danger").style.display = "none";
    }, 3000);
    return;
  } else {
    // add this information to a firestore database
    firebase.database().ref("Projects").push({
      clientsName: clientsNAme,
      projectName: projectName,
      projectStartDate: projectStartDate,
      projectEndDate: projectEndDate,
      projectnotes: Projectnotes,
    });
  }

  // success alert
  var alert = document.getElementById("alert_success");
  alert.style.display = "block";
  alert.innerHTML = "Project successfully added";
  setTimeout(function () {
    document.getElementById("alert_success").style.display = "none";
  }, 3000);

  // clear inputs
  document.getElementById("PersonName").value = "";
  document.getElementById("ProjectName").value = "";
  document.getElementById("ProjectStartDate").value = "";
  document.getElementById("ProjectDueDate").value = "";
  document.getElementById("Projectnotes").value = "";
}
