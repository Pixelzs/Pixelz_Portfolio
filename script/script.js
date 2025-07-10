const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const containerEl = document.getElementById("projHighlight");
const projEL = document.getElementById("projGrid");
const codeGridEl = document.getElementById("codeGrid");
const gameGridEl = document.getElementById("gameGrid");
const homeEle = document.getElementById("about");
const viewprojBut = document.querySelectorAll(".viewProjectBtn");

const API_IMG ={ 
    git: "https://cdn.brandfetch.io/github.com/w/512/h/502/theme/light/symbol?c=1id9l1RAjnD5D03h1Vq",
    linkIn: "https://cdn.brandfetch.io/linkedin.com/w/512/h/437/symbol?c=1id9l1RAjnD5D03h1Vq"
}


function applyStoredTheme(){
    // Get saved theme or default to "light"
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Clear any previously applied theme class
    document.body.classList.remove('light-theme', 'dark-theme');
    // Apply the saved theme SPEFICIALLY CALLING CSS TO CHANGE BETWEEN TWO CLASSES
    document.body.classList.add(`${savedTheme}-theme`);
    // Update the toggle button text to reflect current theme
    toggleThemeBtn.textContent =
        savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    if(savedTheme ==='light'){
        document.documentElement.style.setProperty("--palMain", "#FF9E2C");
        document.documentElement.style.setProperty("--palSecond", "#FF5E3A");
        document.documentElement.style.setProperty("--palThird", "#2D0245");
        document.documentElement.style.setProperty("--palHighlight", "#021a3d");
    }else{
        document.documentElement.style.setProperty("--palMain", "#021a3d");
        document.documentElement.style.setProperty("--palSecond", "#2D0245");
        document.documentElement.style.setProperty("--palThird", "#FF5E3A");
        document.documentElement.style.setProperty("--palHighlight", "#FF9E2C");
    }
};


function removeAllClasses(element, classes) {
    element.forEach(elem => classes.forEach(cls => {elem.classList.remove(cls)}));
}
function addClasses(element, classes) {
    element.forEach(elem => classes.forEach(cls => {elem.classList.add(cls)}));
}


function imgtrans(target, newsource){
    if (!target.src.endsWith(newsource.replace('./', ''))) {
        target.classList.add('fading');
        setTimeout(() => {
            target.src = newsource;
            target.onload = () => {
                target.classList.remove('fading');
            };
        }, 250); // Half the transition time
    }
}



document.addEventListener('DOMContentLoaded', () =>{
    applyStoredTheme();

    const giticon = document.getElementById("gitimg");
    const linkicon = document.getElementById("linkimg");

    if(giticon)
    {
        giticon.src = API_IMG.git;
        giticon.addEventListener("click", () => {
            window.location = "https://github.com/Pixelzs";
        })
    }
    if(linkicon)
    {
        linkicon.src = API_IMG.linkIn;
        linkicon.addEventListener("click", () => {
            window.location = "https://www.linkedin.com/in/matthew-thompson-855381205/";
        })
    }



    if(toggleThemeBtn){
        // When the button is clicked, toggle theme and save new value
        toggleThemeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            // Save new theme to localStorage
            localStorage.setItem('theme', newTheme);
            // Apply updated theme
            applyStoredTheme();
        });
    }
    
    //Elements
    const elements = [
        codeGridEl,
        gameGridEl,
        homeEle,
        containerEl,
        projEL
    ];
    const modeClasses = ["right-mode", "left-mode"];
    
    function cardSelectHandler(modeClass){
        return (e) => {
            e.stopPropagation();
            document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            removeAllClasses(elements, modeClasses);
            addClasses(elements, [modeClass]);
            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });

            
        };
    }

    
    viewprojBut.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            let projId = button.getAttribute('dataID');
            let refId = button.getAttribute('refID');
            console.log(refId);
            
            if(projId){
                window.location.href = `./project.html?id=${projId}`;
            }

            switch(refId){
                case "1": window.location.href = "https://github.com/Pixelzs/Pixelz_Portfolio"; break; //Portfolio
                case "2": window.location.href = "https://github.com/Pixelzs/ParticleScript"; break; //Particle
                case "3": window.location.href = "https://github.com/Pixelzs/PortfolioJson"; break; //JSON
                case "4": window.location.href = "https://github.com/Pixelzs/ParticleScript"; break; //C#
                case "5": window.location.href = "https://github.com/Pixelzs/project_sql"; break; //SQL
            }

        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });
        card.addEventListener('touchend', function() {
            // Remove after a short delay so the effect is visible
            setTimeout(() => this.classList.remove('touch-hover'), 200);
        });
    });

    document.querySelectorAll('#codeGrid .card').forEach(card => {
        card.addEventListener('click', cardSelectHandler(modeClasses[1]));
    });


    document.querySelectorAll('#gameGrid .card').forEach(card => {
        card.addEventListener('click', cardSelectHandler(modeClasses[0]));
    });

    document.body.addEventListener('click', () => {
        removeAllClasses(elements, modeClasses);
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    });


    window.addEventListener('scroll', function() {
        const img = document.getElementById("abimg");
        let newSrc;
        if(window.scrollY <= 99) {
            homeEle.classList.remove('openAb');
            homeEle.style.position = "relative";
            homeEle.parentElement.style.display = "flex";
            homeEle.parentElement.style.justifyContent = "center";
            homeEle.style.left = "";
            homeEle.style.right = "";
            homeEle.style.width = "";
            newSrc = "./style/assets/PixelzLogo.png";
            imgtrans(img,newSrc);
        } else if (this.window.scrollY > 99 && this.window.scrollY  <= 601){
            homeEle.classList.add('openAb');
            homeEle.style.position = "relative";
            homeEle.parentElement.style.display = "flex";
            homeEle.parentElement.style.justifyContent = "center";
            homeEle.style.left = "";
            homeEle.style.right = "";
            homeEle.style.width = "";
            newSrc = "./style/assets/Eselfie.JPG"
            imgtrans(img,newSrc);
            if (this.window.scrollY > 151){
                const rect = homeEle.getBoundingClientRect();
                const scrollTop = window.scrollY || window.pageYOffset;
                homeEle.style.position = "fixed";
                homeEle.style.top = (rect.top/scrollTop)+ 150 + "px";
                homeEle.style.width = rect.width + "px";
                homeEle.parentElement.style.justifyContent = "flex-end";
            }
            else{
                homeEle.style.top = "";
            }
        }
        else if (window.scrollY > 601){
            
            homeEle.style.top = "";
            homeEle.style.left = "";
            homeEle.style.right = "";
            homeEle.style.width = "";
            homeEle.style.position = "relative";
            homeEle.parentElement.style.justifyContent = "flex-end";
        }
    });
});