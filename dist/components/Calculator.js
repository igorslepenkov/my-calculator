export class Calculator {
    appendPlace;
    htmlElement;
    constructor(appendPlace) {
        this.appendPlace = appendPlace;
        this.htmlElement = null;
    }
    create = () => {
        const calculator = document.createElement("section");
        calculator.setAttribute("id", "calculator");
        calculator.className = "calculator";
        this.appendPlace.insertAdjacentElement("beforeend", calculator);
        const input = document.createElement("input");
        const inputAttributes = [
            ["id", "calculator__input"],
            ["type", "text"],
            ["autofocus", "autofocus"],
            ["class", "calculator__input"],
        ];
        for (const attribute of inputAttributes) {
            input.setAttribute(attribute[0], attribute[1]);
        }
        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "calculator__buttons";
        const buttons = [
            "c",
            "%",
            ".",
            "/",
            "7",
            "8",
            "9",
            "*",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "+",
            "0",
            "(",
            ")",
            "=",
        ];
        for (const char of buttons) {
            const buttonHtml = `<button class="calculator__button" type="button" data-action="${char}">${char.toUpperCase()}</button>`;
            buttonsContainer.insertAdjacentHTML("beforeend", buttonHtml);
        }
        calculator.insertAdjacentElement("beforeend", input);
        calculator.insertAdjacentElement("beforeend", buttonsContainer);
        this.htmlElement = calculator;
    };
}
