import BasicCalculator from './BasicCalculator.js';

export default class ScientificCalculator extends BasicCalculator {
    calculateSquareRoot() {
        const currentValue = parseFloat(this.display.value);
        this.display.value = Math.sqrt(currentValue).toString();
    }

    calculateSquare() {
        const currentValue = parseFloat(this.display.value);
        this.display.value = (currentValue ** 2).toString();
    }

    appendPi() {
        this.append(Math.PI.toFixed(2));
    }

    appendE() {
        this.append(Math.E.toFixed(5));
    }

    appendOpenParenthesis() {
        this.append("(");
    }

    appendCloseParenthesis() {
        this.append(")");
    }

    calculate() {
        try {
            const result = eval(this.display.value);
            this.display.value = result.toString();
        } catch (error) {
            this.display.value = "Error";
        }
    }
}
