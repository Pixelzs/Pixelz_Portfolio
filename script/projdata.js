const params = new URLSearchParams(window.location.search);
const projId = Number(params.get('id'));

fetch('./script/projects.json')
    .then(response => response.json())
    .then(data => {
    // Combine both codeproj and gameproj arrays
    const allProjects = [...data.codeproj, ...data.gameproj];
    const project = allProjects.find(p => p.id === projId);

    if (project) {
        document.getElementById('projTitle').textContent = project.title;
        document.getElementById('projDesc').textContent = project.description;
        // ...fill in other elements as needed
    } else {
        document.getElementById('projTitle').textContent = "Project not found";
        document.getElementById('projDesc').textContent = "";
    }
    });