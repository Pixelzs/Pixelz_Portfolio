const params = new URLSearchParams(window.location.search);
const projId = Number(params.get('id'));

fetch('https://pixelzs.github.io/PortfolioJson/projects.json')
    .then(response => response.json())
    .then(data => {
    // Combine both codeproj and gameproj arrays
    const proJson = data.projs;
    const projData = proJson.find(p => p.id === projId);

    const projTitle = document.querySelector('title');
    const projAbout = document.getElementById("projAbout");
    const projPara = document.getElementById("projPara1");
    const projDisc = document.getElementById("disclaimer");
    const projMainGal = document.getElementById("mainGal");
    const projSlice = document.getElementById("projSlice");
    const projPreGal = document.getElementById("preGal");
    const projDevGal = document.getElementById("devGal");
    const projBeautyGal = document.getElementById("beautyGal");
    


    if (projData) {

        document.documentElement.style.setProperty("--palMain", `${projData.palette.main}`);
        document.documentElement.style.setProperty("--palSecond", `${projData.palette.secondary}`);
        document.documentElement.style.setProperty("--palThird", `${projData.palette.third}`);
        document.documentElement.style.setProperty("--palHighlight", `${projData.palette.highlight}`);

        projTitle.textContent = projData.title + " | Pixelz Porfolio";
        projAbout.firstElementChild.textContent = projData.date;
        projAbout.firstElementChild.nextElementSibling.textContent = projData.title;
        projAbout.firstElementChild.nextElementSibling.nextElementSibling.textContent = projData.about.intro;
        
        projSlice.firstElementChild.textContent = projData.title;

        projPara.firstElementChild.textContent = projData.about.para;

        if(Object.getOwnPropertyNames(projData).includes("links"))
        {
            const videoslice = document.createElement('iframe');
            const videoslice2 = document.createElement('iframe');
            const videoslice3 = document.createElement('iframe');

            videoslice.src = projData.links.video1;
            videoslice2.src = projData.links.video2;
            videoslice3.src = projData.links.video3;

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
        }
        

    } else {
        document.getElementById('projTitle').textContent = "Project not found";
        document.getElementById('projDesc').textContent = "";
    }
    });