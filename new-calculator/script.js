class Calculator {
    constructor(displayElement, historyElement) {
        this.displayElement = displayElement;
        this.historyElement = historyElement;
        this.reset();
    }

    reset() {
        this.displayElement.innerText = '0';
        this.currentInput = '';
        this.operator = null;
        this.firstOperand = null;
        this.history = []; // Menyimpan riwayat perhitungan
    }

    append(value) {
        if (this.displayElement.innerText === '0' && value !== '.') {
            this.displayElement.innerText = value;
        } else {
            this.displayElement.innerText += value;
        }
        this.currentInput += value; // Simpan input saat ini
    }

    setOperator(operator) {
        if (this.firstOperand === null) {
            this.firstOperand = parseFloat(this.displayElement.innerText);
        } else {
            this.calculate(); // Hitung jika operand pertama sudah ada
        }
        this.operator = operator; // Set operator
        this.currentInput = ''; // Reset input saat ini

        // Update tampilan untuk menampilkan ekspresi
        this.updateDisplayWithOperator();
    }

    calculate() {
        if (this.firstOperand === null || this.operator === null) return;

        const secondOperand = parseFloat(this.displayElement.innerText);
        let result;

        switch (this.operator) {
            case '+':
                result = this.firstOperand + secondOperand;
                break;
            case '-':
                result = this.firstOperand - secondOperand;
                break;
            case '*':
                result = this.firstOperand * secondOperand;
                break;
            case '/':
                result = this.firstOperand / secondOperand;
                break;
            default:
                return;
        }

        // Update tampilan dan riwayat
        this.displayElement.innerText = result;
        this.history.push(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`);
        this.firstOperand = result; // Simpan hasil sebagai operand pertama untuk chaining
        this.operator = null; // Reset operator
        this.currentInput = ''; // Reset input saat ini

        // Tampilkan riwayat
        this.updateHistory();
    }

    updateDisplayWithOperator() {
        this.displayElement.innerText = `${this.firstOperand || ''} ${this.operator || ''} ${this.currentInput || ''}`;
    }

    updateHistory() {
        this.historyElement.innerHTML = this.history.join('<br/>'); // Menampilkan riwayat
    }

    // Fitur tambahan lainnya...
}

const theme = {
    initialize: function() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = savedTheme || (prefersDarkScheme ? "dark" : "light");
        document.body.classList.add(currentTheme);
        document.getElementById("calculator").classList.add(currentTheme);
        document.getElementById("display").classList.add(currentTheme);
        this.updateButtonText(currentTheme);
    },

    toggle: function() {
        const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.body.classList.replace(currentTheme, newTheme);
        document.getElementById("calculator").classList.replace(currentTheme, newTheme);
        document.getElementById("display").classList.replace(currentTheme, newTheme);
        
        document.querySelectorAll(".button").forEach(button => {
            button.classList.replace(currentTheme, newTheme);
        });
        
        localStorage.setItem("theme", newTheme);
        this.updateButtonText(newTheme);
    },

    updateButtonText: function(theme) {
        const toggleButton = document.getElementById("toggleButton");
        toggleButton.textContent = theme === "dark" ? "🌕" : "☀️";
    }
};

// Inisialisasi Kalkulator
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const historyElement = document.getElementById("history"); // Ambil elemen riwayat
    const calculator = new Calculator(display, historyElement);

    document.querySelectorAll(".button").forEach(button => {
        const value = button.getAttribute("data-value");

        button.addEventListener("click", () => {
            if (!isNaN(value) || value === '.' || value === '(' || value === ')') {
                calculator.append(value);
            } else {
                switch (value) {
                    case "AC":
                        calculator.reset();
                        break;
                    case "=":
                        calculator.calculate();
                        break;
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                        calculator.setOperator(value);
                        break;
                    // Fitur lainnya...
                }
            }
        });
    });

    theme.initialize();
    document.getElementById("toggleButton").onclick = () => theme.toggle();
});
