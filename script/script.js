const toggleThemeBtn = document.getElementById('toggleThemeBtn');
// Function to read from localStorage and apply the appropriate theme
const applyStoredTheme = () => {
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
        document.documentElement.style.setProperty("--palMain", "#FFBD69");
        document.documentElement.style.setProperty("--palSecond", "#FF6363");
        document.documentElement.style.setProperty("--palThird", "#543864");
        document.documentElement.style.setProperty("--palHighlight", "#202040");
    }else{
        document.documentElement.style.setProperty("--palMain", "#202040");
        document.documentElement.style.setProperty("--palSecond", "#543864");
        document.documentElement.style.setProperty("--palThird", "#FF6363");
        document.documentElement.style.setProperty("--palHighlight", "#FFBD69");
    }
};
// When the button is clicked, toggle theme and save new value
toggleThemeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    // Save new theme to localStorage
    localStorage.setItem('theme', newTheme);
    // Apply updated theme
    applyStoredTheme();
});

const containerEl = document.getElementById("projHighlight");
const projEL = document.getElementById("projGrid");
const codeGridEl = document.getElementById("codeGrid");
const gameGridEl = document.getElementById("gameGrid");
const homeEle = document.getElementById("home");
const aboutBut = document.getElementById("aboutBut");


// Apply theme as soon as the DOM is ready


document.addEventListener('DOMContentLoaded', applyStoredTheme);

document.addEventListener('DOMContentLoaded', () =>{


    function removeAllClasses(element, classes) {
        element.forEach(elem => classes.forEach(cls => {elem.classList.remove(cls)}));
    }
    function addClasses(element, classes) {
        element.forEach(elem => classes.forEach(cls => {elem.classList.add(cls)}));
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
    const aboutClasses = ["openAb"];

    aboutBut.addEventListener('click', (e) => {
        e.stopPropagation();
        removeAllClasses(elements, modeClasses);
        addClasses([homeEle,homeEle.firstElementChild], aboutClasses);
    });


    codeGridEl.addEventListener('click', (e) => {
        e.stopPropagation();
        // Remove the openAb class from homeEle and its first child
        removeAllClasses([homeEle, homeEle.firstElementChild], aboutClasses);
        removeAllClasses(elements, ["right-mode"]);
        addClasses([codeGridEl, gameGridEl, homeEle, containerEl, projEL], ["left-mode"]);
    })

    gameGridEl.addEventListener('click', (e) => {
        e.stopPropagation();
        removeAllClasses([homeEle, homeEle.firstElementChild], aboutClasses);
        removeAllClasses(elements, ["left-mode"]);
        addClasses([codeGridEl, gameGridEl, homeEle, containerEl, projEL], ["right-mode"]);
    })

    document.body.addEventListener('click', () => {
        removeAllClasses(elements, ["right-mode"]);
        removeAllClasses(elements, ["left-mode"]);
        removeAllClasses([homeEle, homeEle.firstElementChild], aboutClasses);
    })


    function scrollToSelected(event) {
        if(event.target.tagName !== 'H2') {
            event.stopPropagation();
            event.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    codeGridEl.addEventListener('click', scrollToSelected);

    gameGridEl.addEventListener('click', scrollToSelected);
})