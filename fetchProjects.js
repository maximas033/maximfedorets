function clearProjectList(projectList) {
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
}

function createCardBody(project) {
  const {
    clientsName,
    projectName,
    projectStartDate,
    projectEndDate,
    projectnotes,
    projectStatus,
  } = project;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = projectName;
  cardBody.appendChild(title);

  const client = document.createElement("p");
  client.classList.add("card-text");
  client.style.color = "orange";
  client.textContent = `Client: ${clientsName}`;
  cardBody.appendChild(client);

  const start = document.createElement("p");
  start.classList.add("card-text");
  start.textContent = `Start Date: ${projectStartDate}`;
  cardBody.appendChild(start);

  const end = document.createElement("p");
  end.classList.add("card-text");
  end.textContent = `End Date: ${projectEndDate}`;
  cardBody.appendChild(end);

  const notes = document.createElement("p");
  notes.classList.add("card-text");
  notes.textContent = `Notes: ${projectnotes}`;
  cardBody.appendChild(notes);

  const status = document.createElement("p");
  status.classList.add("card-text");
  status.textContent = `Status: ${projectStatus}`;
  cardBody.appendChild(status);

  return cardBody;
}

function createInputSection(project, updateProjectStatus) {
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newStatus = event.target.elements.status.value;
    updateProjectStatus(project.key, newStatus);
  });

  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");
  form.appendChild(inputGroup);

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "status");
  input.setAttribute("placeholder", "Change status...");
  input.classList.add("form-control");
  inputGroup.appendChild(input);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add("btn", "btn-success");
  button.textContent = "Save";
  inputGroup.appendChild(button);

  return form;
}

function createDeleteButton(project, projectList) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "mt-2");
  deleteButton.setAttribute("style", "width:100%");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    const projectRef = firebase.database().ref(`Projects/${project.key}`);
    projectRef
      .remove()
      .then(() => console.log("Project deleted successfully."))
      .catch((error) => console.log("Error deleting project:", error));

    clearProjectList(projectList);
  });

  return deleteButton;
}

function createProjectCard(project, updateProjectStatus, projectList) {
  const card = document.createElement("div");
  card.classList.add("col-md-6", "mb-4");

  const innerCard = document.createElement("div");
  innerCard.classList.add("card", "h-100");
  card.appendChild(innerCard);

  const cardBody = createCardBody(project);
  innerCard.appendChild(cardBody);

  const inputSection = createInputSection(project, updateProjectStatus);
  cardBody.appendChild(inputSection);

  const deleteButton = createDeleteButton(project, projectList);
  cardBody.appendChild(deleteButton);

  return card;
}

function displayProjects(projects, projectList, updateProjectStatus) {
  if (projects.length === 0) {
    const noProjects = document.createElement("p");
    noProjects.classList.add("text-center", "mt-3");
    noProjects.textContent = "No projects found.";
    noProjects.style.color = "red";
    projectList.appendChild(noProjects);
  } else {
    projects.forEach((project) => {
      const card = createProjectCard(project, updateProjectStatus, projectList);
      projectList.appendChild(card);
    });
  }
}

function fetchProjectsFromDatabase(projectList, updateProjectStatus) {
  const projectsRef = firebase.database().ref("Projects");

  projectsRef.on(
    "value",
    function (snapshot) {
      const projectsArray = Object.entries(snapshot.val() || {}).map(
        ([key, value]) => ({ key, ...value })
      );

      clearProjectList(projectList);
      displayProjects(projectsArray, projectList, updateProjectStatus);
    },
    function (error) {
      console.log("Error getting projects:", error);
    }
  );
}

function updateProjectStatus(projectKey, newStatus) {
  const projectRef = firebase.database().ref(`Projects/${projectKey}`);
  projectRef.update({ projectStatus: newStatus }, function (error) {
    if (error) {
      console.log("Error updating project status:", error);
      alert(`Error updating project status:`, error);
    } else {
      console.log("Project status updated successfully.");
      alert("Project status updated successfully.");
    }
  });
}

function fetchProjects() {
  const projectList = document.getElementById("project-list");
  fetchProjectsFromDatabase(projectList, updateProjectStatus);
}

window.onload = fetchProjects;
