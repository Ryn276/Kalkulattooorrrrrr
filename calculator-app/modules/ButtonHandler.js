export default class ButtonHandler {
    constructor(calculator) {
        this.calculator = calculator;
    }

    handleButton(value) {
        if (!isNaN(value) || value === '.') {
            this.calculator.append(value);
        } else if (value === "AC") {
            this.calculator.clear();
        } else if (value === "+/-") {
            this.calculator.toggleSign();
        } else if (value === "√") {
            this.calculator.calculateSquareRoot();
        } else if (value === "x²") {
            this.calculator.calculateSquare();
        } else if (value === "=") {
            this.calculator.calculate();
        } else if (value === "π") {
            this.calculator.appendPi();
        } else if (value === "e") {
            this.calculator.appendE();
        } else if (value === "(") {
            this.calculator.appendOpenParenthesis();
        } else if (value === ")") {
            this.calculator.appendCloseParenthesis();
        } else {
            this.calculator.append(value);
        }
    }
}
