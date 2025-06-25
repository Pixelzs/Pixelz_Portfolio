const params = new URLSearchParams(window.location.search);
const projId = Number(params.get('id'));

fetch('./script/projects.json')
    .then(response => response.json())
    .then(data => {
    // Combine both codeproj and gameproj arrays
    const allProjects = [...data.codeproj, ...data.gameproj];
    const project = allProjects.find(p => p.id === projId);

    const projDate = document.getElementById('projDate');
    const projTitle = document.getElementById('projTitle');
    const projDesc = document.getElementById('projDesc');
    const galleryMain = document.getElementById('galleryMain');
    const projAbout = document.getElementById('projAbout');
    const projSlice = document.getElementById('projSlice');

    if (project) {

        document.documentElement.style.setProperty("--palMain", `${project.palette.main}`);
        document.documentElement.style.setProperty("--palSecond", `${project.palette.secondary}`);
        document.documentElement.style.setProperty("--palThird", `${project.palette.third}`);
        document.documentElement.style.setProperty("--palHighlight", `${project.palette.highlight}`);


        projDate.textContent = project.date;
        projTitle.textContent = project.title;
        projDesc.textContent = project.description;
        projAbout.firstElementChild.textContent = project.about.intro;

        const para1 = document.createElement('p');
        const para2 = document.createElement('p');
        const para3 = document.createElement('p');
        const para4 = document.createElement('p');

        para1.textContent = project.about.para;
        para2.textContent = project.about.para2;
        para3.textContent = project.about.para3;
        para4.textContent = project.about.para4;

        projAbout.appendChild(para1);
        projAbout.appendChild(para2);
        projAbout.appendChild(para3);
        projAbout.appendChild(para4);

        const videoslice = document.createElement('iframe');
        const videoslice2 = document.createElement('iframe');
        const videoslice3 = document.createElement('iframe');

        videoslice.src = project.links.video1;
        videoslice2.src = project.links.video2;
        videoslice3.src = project.links.video3;

        videoslice.width = "560";
        videoslice.height = "315";
        videoslice2.width = "560";
        videoslice2.height = "315";
        videoslice3.width = "560";
        videoslice3.height = "315";

        

        videoslice.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoslice2.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoslice3.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoslice.allowFullscreen = true;
        videoslice2.allowFullscreen = true;
        videoslice3.allowFullscreen = true;
        projSlice.children[1].insertAdjacentElement('afterend', videoslice3);
        projSlice.children[1].insertAdjacentElement('afterend', videoslice2);
        projSlice.children[1].insertAdjacentElement('afterend', videoslice);

    } else {
        document.getElementById('projTitle').textContent = "Project not found";
        document.getElementById('projDesc').textContent = "";
    }
    });