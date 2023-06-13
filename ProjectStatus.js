// Database interactions
const database = {
    dbRef: firebase.database().ref("AllMyProjects"),

    subscribeToProjects: function(callback) {
        this.dbRef.on("value", snapshot => {
            const projectsSnapshot = snapshot.val();
            if (projectsSnapshot) {
                callback(projectsSnapshot);
            } else {
                console.error("Error retrieving projects data");
            }
        }, errorObject => {
            console.error("Failed to read data: ", errorObject.code);
        });
    }
}

// Project functions
const projectFunctions = {
    colorMap: {
        "Online": "green",
        "Offline": "red",
        "Under Construction": "orange"
    },

    parseProjects: function(projectsSnapshot) {
        // Parse the projectsSnapshot into an array of project objects
        return Object.keys(projectsSnapshot).reduce((acc, key) => {
            const project = projectsSnapshot[key];
            if (project.name && project.status && project.imageFileName) {
                acc.push({
                    id: key,
                    ...project
                });
            }
            return acc;
        }, []);
    },

    updateStatusElement: function(element, project) {
        // Update the visual status of a project
        element.innerHTML = project.status;
        element.style.color = this.colorMap[project.status] || "black";  // Defaults to black if status not recognized
    },

    updateButtonVisibility: function(element, project) {
        // Update the visibility of a project button based on its status
        element.style.display = project.status === "Online" ? "block" : "none";
    }
}

// UI functions
const ui = {
    containers: null,
    projectElements: {},

    updateUI: function(projectsSnapshot) {
        // Update the UI based on the updated projects data
        try {
            const projects = projectFunctions.parseProjects(projectsSnapshot);

            projects.forEach(project => {
                const container = this.projectElements[project.name];
                if (!container) return;

                const statusElement = container.querySelector('.status');
                const btnContainer = container.querySelector('.linkToTheWebsite');

                projectFunctions.updateStatusElement(statusElement, project);
                projectFunctions.updateButtonVisibility(btnContainer, project);
            });

            console.log("Updated projects:", projects);
        } catch (error) {
            console.error(error);
        }
    },

    initializeUI: function() {
        // Initialize the UI
        this.containers = document.querySelectorAll('.container');
        this.projectElements = Array.from(this.containers).reduce((acc, container) => {
            const h4 = container.querySelector('h4');
            acc[h4.textContent.trim()] = container;
            return acc;
        }, {});

        database.subscribeToProjects(this.updateUI.bind(this));
    }
}

window.onload = () => ui.initializeUI();
