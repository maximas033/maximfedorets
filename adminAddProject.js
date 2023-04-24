function AddProject(event) {
  event.preventDefault();
  var clientsNAme = document.getElementById("PersonName").value;
  var projectName = document.getElementById("ProjectName").value;
  var projectStartDate = document.getElementById("ProjectStartDate").value;
  var projectEndDate = document.getElementById("ProjectDueDate").value;
  var Projectnotes = document.getElementById("Projectnotes").value;

  // add this information to a firestore database
  firebase.database().ref("Projects").push({
    clientsName: clientsNAme,
    projectName: projectName,
    projectStartDate: projectStartDate,
    projectEndDate: projectEndDate,
    projectnotes: Projectnotes,
  });

  // success alert
  var alert = document.getElementById("alert");
  alert.innerHTML = "Project added";
  alert.style.color = "green";
  setTimeout(function () {
    alert.innerHTML = "";
  }, 3000);

  // clear inputs
  document.getElementById("PersonName").value = "";
  document.getElementById("ProjectName").value = "";
  document.getElementById("ProjectStartDate").value = "";
  document.getElementById("ProjectDueDate").value = "";
  document.getElementById("Projectnotes").value = "";
}
