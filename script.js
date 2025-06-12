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

// Apply theme as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', applyStoredTheme);