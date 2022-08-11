import { Calculator } from "./components/Calculator.js";
const initApp = () => {
    const root = document.querySelector("#root");
    if (root) {
        const calculator = new Calculator(root);
        calculator.create();
    }
};
initApp();
