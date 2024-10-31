import ScientificCalculator from "./ScientificCalculator.js";
import Display from "./Display.js";
import Theme from "./Theme.js";
import ButtonHandler from "./ButtonHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const displayElement = document.getElementById("display");
  const display = new Display(displayElement);

  const calculator = new ScientificCalculator(display);
  const buttonHandler = new ButtonHandler(calculator);

  const theme = new Theme();
  theme.initializeTheme();

  document.getElementById("toggleButton").onclick = () => theme.toggleMode();

  document.querySelectorAll(".button").forEach((button) => {
    const value = button.getAttribute("data-value"); // Mengambil nilai dari atribut data
    button.addEventListener("click", () => buttonHandler.handleButton(value));
  });
});
