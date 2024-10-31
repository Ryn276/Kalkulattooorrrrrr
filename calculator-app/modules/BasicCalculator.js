export default class BasicCalculator {
    constructor(display) {
        if (new.target === BasicCalculator) {
            throw new TypeError("Cannot Instantiate BasicCalculator directly");
        }
        this.display = display;
    }

    append(value) {
        this.display.value =
            this.display.value === "0" ? value : this.display.value + value;
    }

    clear() {
        this.display.clear();
    }

    toggleSign() {
        this.display.value = this.display.value.startsWith("-")
            ? this.display.value.slice(1)
            : "-" + this.display.value;
    }

    calculate() {
        throw new Error("Method 'calculate()' must be implemented.");
    }
}
