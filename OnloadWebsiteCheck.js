function OnloadWebsiteStatus() {
    // Database interactions
    const database = {
        dbRef: firebase.database().ref("AllMyProjects"),

        fetchProjectsOnce: function (callback) {
            this.dbRef.once("value", snapshot => {
                const projectsSnapshot = snapshot.val();
                if (projectsSnapshot) {
                    callback(projectsSnapshot);
                } else {
                    console.error("Error retrieving project data");
                }
            }, errorObject => {
                console.error("Failed to read data: ", errorObject.code);
            });
        }
    }

    // UI functions
    const ui = {
        findTargetProject: function (projectsSnapshot, projectName) {
            const projects = Object.values(projectsSnapshot);
            return projects.find(project => project.name === projectName);
        },

        updateUI: function (projectsSnapshot) {
            try {
                const targetProject = this.findTargetProject(projectsSnapshot, "Maxim Fedorets");

                if (targetProject) {
                    console.log(`Status of project ${targetProject.name}: ${targetProject.status}`);
                    if (["Offline", "Under Construction"].includes(targetProject.status)) {
                        window.location.href = "Underwork.html";
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
    }

    // Fetch all projects data on load
    database.fetchProjectsOnce(ui.updateUI.bind(ui));
}

window.onload = OnloadWebsiteStatus;
