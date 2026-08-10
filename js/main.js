const btn = document.getElementById('theme-toggle');
const body = document.body;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Logic to determine which theme to apply
 */
function setTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // 1. If user has a saved preference, use it
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    } else {
    // 2. Otherwise, follow the system preference
        body.classList.toggle('dark-mode', darkQuery.matches);
    }
    updateButtonText();
}

function updateButtonText() {
    btn.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// Initial application
setTheme();

// Handle manual toggle
btn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateButtonText();
});

// WATCH FOR SYSTEM CHANGES
// This respects the OS even if the user hasn't clicked anything yet
darkQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        body.classList.toggle('dark-mode', e.matches);
        updateButtonText();
    }
});