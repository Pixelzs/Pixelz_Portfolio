const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const containerEl = document.getElementById("projHighlight");
const projEL = document.getElementById("projGrid");
const codeGridEl = document.getElementById("codeGrid");
const gameGridEl = document.getElementById("gameGrid");
const homeEle = document.getElementById("about");
const viewprojBut = document.querySelectorAll(".viewProjectBtn");


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
        document.documentElement.style.setProperty("--palMain", "#FFFFFF");
        document.documentElement.style.setProperty("--palSecond", "#FF6363");
        document.documentElement.style.setProperty("--palThird", "#543864");
        document.documentElement.style.setProperty("--palHighlight", "#202040");
    }else{
        document.documentElement.style.setProperty("--palMain", "#1A1A1A");
        document.documentElement.style.setProperty("--palSecond", "#543864");
        document.documentElement.style.setProperty("--palThird", "#FF6363");
        document.documentElement.style.setProperty("--palHighlight", "#FFBD69");
    }
};


function removeAllClasses(element, classes) {
    element.forEach(elem => classes.forEach(cls => {elem.classList.remove(cls)}));
}
function addClasses(element, classes) {
    element.forEach(elem => classes.forEach(cls => {elem.classList.add(cls)}));
}


function imgtrans(target, newsource){
    if (target.src !== location.origin + newsource.replace('./', '/')) {
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

            viewprojBut.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const projId = button.getAttribute('dataID');
                    if(projId){
                        window.location.href = `./project.html?id=${projId}`;
                    }
                });
            });
        };
    }


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
        const img = homeEle.firstElementChild;
        let newSrc;
        if(window.scrollY <= 99) {
            newSrc = "./style/assets/PixelzLogo.png";
            homeEle.classList.remove('openAb');
            homeEle.style.position = "relative";
            homeEle.parentElement.style.display = "flex";
            homeEle.parentElement.style.justifyContent = "center";
            imgtrans(img,newSrc);
        } else if (this.window.scrollY > 99 && this.window.scrollY  <= 601){
            newSrc = "./style/assets/Eselfie.JPG";
            homeEle.classList.add('openAb');
            homeEle.style.position = "relative";
            homeEle.parentElement.style.display = "flex";
            homeEle.parentElement.style.justifyContent = "center";
            imgtrans(img,newSrc);
            if (this.window.scrollY > 301){
                homeEle.style.position = "fixed";
                homeEle.parentElement.style.justifyContent = "flex-start";
            }
        }
        else{
            homeEle.style.position = "relative";
            homeEle.parentElement.style.justifyContent = "flex-end";
        }
    });
});