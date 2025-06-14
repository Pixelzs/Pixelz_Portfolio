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


    aboutBut.addEventListener('click', (e) => {
        e.stopPropagation();

        codeGridEl.classList.remove("right-mode");
        gameGridEl.classList.remove("right-mode");
        homeEle.classList.remove("right-mode");
        containerEl.classList.remove("right-mode");
        projEL.classList.remove("right-mode");
        codeGridEl.classList.remove("left-mode");
        gameGridEl.classList.remove("left-mode");
        homeEle.classList.remove("left-mode");
        containerEl.classList.remove("left-mode");
        projEL.classList.remove("left-mode")

        homeEle.classList.add("openAb");
        homeEle.firstElementChild.classList.add("openAb");


    });


    codeGridEl.addEventListener('click', (e) => {
        e.stopPropagation();

        homeEle.classList.remove("openAb");
        homeEle.firstElementChild.classList.remove("openAb");
        
        codeGridEl.classList.remove("right-mode");
        gameGridEl.classList.remove("right-mode");
        homeEle.classList.remove("right-mode");
        containerEl.classList.remove("right-mode");
        projEL.classList.remove("right-mode");

        codeGridEl.classList.add("left-mode");
        gameGridEl.classList.add("left-mode")
        homeEle.classList.add("left-mode");
        containerEl.classList.add("left-mode");
        projEL.classList.add("left-mode");
    })

    gameGridEl.addEventListener('click', (e) => {
        e.stopPropagation();
        homeEle.classList.remove("openAb");
        homeEle.firstElementChild.classList.remove("openAb");

        codeGridEl.classList.remove("left-mode");
        gameGridEl.classList.remove("left-mode");
        homeEle.classList.remove("left-mode");
        containerEl.classList.remove("left-mode");
        projEL.classList.remove("left-mode");


        gameGridEl.classList.add("right-mode");
        codeGridEl.classList.add("right-mode");
        homeEle.classList.add("right-mode");
        containerEl.classList.add("right-mode");
        projEL.classList.add("right-mode");
    })

    document.body.addEventListener('click', () => {
        codeGridEl.classList.remove("right-mode");
        gameGridEl.classList.remove("right-mode");
        homeEle.classList.remove("right-mode");
        containerEl.classList.remove("right-mode");
        projEL.classList.remove("right-mode");
        codeGridEl.classList.remove("left-mode");
        gameGridEl.classList.remove("left-mode");
        homeEle.classList.remove("left-mode");
        containerEl.classList.remove("left-mode");
        projEL.classList.remove("left-mode")

        homeEle.classList.remove("openAb");
        homeEle.firstElementChild.classList.remove("openAb");
    })
})