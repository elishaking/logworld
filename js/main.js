const state = {
  calculating: false,
  error: "",
};

// @ts-ignore
const MQ = MathQuill.getInterface(2);

const answerSpan = document.getElementById("math");
// @ts-ignore
const mathInput = MQ.MathField(answerSpan, {
  handlers: {
    edit: () => {
      const enteredMath = mathInput.latex();
      //   console.log(enteredMath);
    },
  },
});

mathInput.cmd("log");
mathInput.cmd("(");

answerSpan.onkeypress = (e) => {
  if (e.keyCode === 13) calculateLog();
};

const calculate = document.getElementById("calculate");
calculate.addEventListener("click", () => {
  calculateLog();
});

const calculateLog = () => {
  const latex = mathInput.latex();
  if (!latex.startsWith("\\log\\left(\\"))
    return setState({
      error: "Please enter a valid log expression",
    });

  setState({
    error: "",
    calculating: true,
  });
  console.log(latex);
};

const errorDiv = document.getElementById("error");
const calculatingDiv = document.getElementById("calculating");
const setState = ({ calculating = undefined, error = undefined }) => {
  if (error !== undefined) {
    if (error === "") errorDiv.style.display = "none";
    else {
      errorDiv.style.display = "block";
      errorDiv.textContent = error;
    }
  }

  if (calculating !== undefined) {
    if (calculating) {
      calculatingDiv.style.display = "block";
      calculate.style.display = "none";
    } else {
      calculatingDiv.style.display = "none";
      calculate.style.display = "block";
    }
  }
};
