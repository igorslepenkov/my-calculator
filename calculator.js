function Calculator() {
  this.root = document.querySelector("#root");

  this.createCalculator = () => {
    const calculator = document.createElement("section");
    calculator.setAttribute("id", "calculator");
    calculator.className = "calculator";
    this.root.insertAdjacentElement("beforeend", calculator);
    return calculator;
  };

  this.createInputCalculator = () => {
    const input = document.createElement("input");
    input.setAttribute("id", "calculator__input");
    input.setAttribute("type", "text");
    input.setAttribute("autofocus", "autofocus");
    input.className = "calculator__input";
    input.addEventListener("input", () => this.onInputChange());
    this.calculator.insertAdjacentElement("beforeend", input);
    return input;
  };

  this.createButtonsContainer = () => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "calculator__buttons";
    this.calculator.insertAdjacentElement("beforeend", buttonsContainer);
    buttonsContainer.addEventListener("click", (event) =>
      this.onButtonsClick(event)
    );
    return buttonsContainer;
  };

  this.onButtonsClick = (event) => {
    if (event.target.type === "button") {
      switch (event.target.dataset.action) {
        case "c":
          this.input.value = "";
          break;
        case "=":
          this.parseMathString();
          break;
        default:
          this.input.value += event.target.dataset.action;
      }
    }
  };

  this.onInputChange = () => {
    if (this.input.value.match(/[^-*+\./0-9\(\)%]/g)) {
      this.input.value = this.input.value.replace(/[^-*+\./0-9\(\)%]/g, "");
    }

    if (this.input.value.match(/[\.0-9%]+\(/g)) {
      this.input.value.match(/[\.0-9%]+\(/g).forEach((exp) => {
        const part1 = exp.match(/[\.0-9%]+/);
        const part2 = exp.match(/\(/);
        const newString = part1 + "*" + part2;
        this.input.value = this.input.value.replace(exp, newString);
      });
    }
  };

  this.processMathString = (string) => {
    let newString = string;

    while (newString.match(/([0-9\.]+)([*/])([0-9\.]+)/)) {
      const devAndMult = newString.match(/([0-9\.]+)([*/])([0-9\.]+)/);
      const operand1 = devAndMult[1];
      const operand2 = devAndMult[3];
      const operator = devAndMult[2];
      let result = null;
      switch (operator) {
        case "*":
          result = Number(operand1) * Number(operand2);
          break;
        case "/":
          result = Number(operand1) / Number(operand2);
          break;
      }
      newString = newString.replace(devAndMult[0], `${result}`);
    }

    while (newString.match(/([0-9\.]+)([-+])([0-9\.]+)/)) {
      const addAndSubstr = newString.match(/([0-9\.]+)([-+])([0-9\.]+)/);
      const operand1 = addAndSubstr[1];
      const operand2 = addAndSubstr[3];
      const operator = addAndSubstr[2];
      let result = null;
      switch (operator) {
        case "+":
          result = Number(operand1) + Number(operand2);
          break;
        case "-":
          result = Number(operand1) - Number(operand2);
          break;
      }
      newString = newString.replace(addAndSubstr[0], `${result}`);
    }

    return newString;
  };

  this.processPercentExpression = (string) => {
    let newString = string;
    while (newString.match(/[0-9\.]+[-\+\/\*][0-9\.]+%/g)) {
      if (newString.match(/([0-9\.]+)([-\+])([0-9\.]+)%/)) {
        const expression = newString.match(/([0-9\.]+)([-+])([0-9\.]+)%/);
        const value = expression[1];
        const operator = expression[2];
        const percents = expression[3];
        const percentsValue = (Number(value) / 100) * Number(percents);
        const newExp = `${value}${operator}${percentsValue}`;

        newString = newString.replace(
          expression[0],
          this.processMathString(newExp)
        );
      } else if (newString.match(/([0-9\.]+)([*\/])([0-9\.]+)%/)) {
        const expression = newString.match(/([0-9\.]+)([*\/])([0-9\.]+)%/);
        const value = expression[1];
        const operator = expression[2];
        const percents = expression[3];
        const percentsValue = 100 / Number(percents);
        const newExp = `${value}${operator}${percentsValue}`;

        newString = newString.replace(
          expression[0],
          this.processMathString(newExp)
        );
      }
    }
    return newString;
  };

  this.openMathBrackets = (string) => {
    let newString = string;

    while (newString.match(/\([^\)\(]*?\)/)) {
      const bracketsExpressions = newString.match(/\([^)(]*?\)/g);
      bracketsExpressions.forEach((exp) => {
        const newExp = exp.match(/^\((.*)\)$/)[1];

        newString = newString.replace(
          exp,
          this.processPercentExpression(newExp)
        );
        newString = newString.replace(exp, this.processMathString(newExp));
      });
    }

    newString = this.processPercentExpression(newString);
    newString = this.processMathString(newString);

    return newString;
  };

  this.parseMathString = () => {
    let stringExpression = this.input.value;

    stringExpression = this.openMathBrackets(stringExpression);

    this.input.value = stringExpression;
  };

  this.calculator = this.createCalculator();
  this.input = this.createInputCalculator();
  this.buttonsContainer = this.createButtonsContainer();

  this.buttons = [
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
  ].forEach((char) => {
    const buttonHtml = `<button class="calculator__button" type="button" data-action="${char}">${char.toUpperCase()}</button>`;
    this.buttonsContainer.insertAdjacentHTML("beforeend", buttonHtml);
  });
}

const calculator = new Calculator();
