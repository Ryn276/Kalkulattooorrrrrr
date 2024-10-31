export default class Theme {
    constructor() {
        this.toggleButton = document.getElementById("toggleButton");
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDarkScheme ? "dark" : "light");

        document.body.classList.add(theme);
        this.updateCalculatorTheme(theme);
    }

    toggleMode() {
        const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.body.classList.replace(currentTheme, newTheme);
        localStorage.setItem("theme", newTheme);
        
        this.updateCalculatorTheme(newTheme);
    }

    updateCalculatorTheme(theme) {
        this.toggleButton.textContent = theme === "dark" ? "🌕" : "☀️";

        const calculator = document.getElementById("calculator");
        const display = document.getElementById("display");
        const buttons = document.querySelectorAll(".button");

        calculator.className = `calculator ${theme}`;
        display.className = `display ${theme}`;
        buttons.forEach((button) => {
            button.classList.remove("dark", "light"); // Remove old theme classes
            button.classList.add(theme); // Add new theme class
        });
    }
}
