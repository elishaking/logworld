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
mathInput.typedText("_");
mathInput.keystroke("Right");
mathInput.typedText("(");

answerSpan.onkeypress = (e) => {
  if (e.keyCode === 13) calculateLog();
};

const calculate = document.getElementById("calculate");
calculate.addEventListener("click", () => {
  calculateLog();
});

const calculateLog = () => {
  const latex = mathInput.latex();

  // fix this
  const regex = /\\log_([0-9]+)\\left\(([0-9]+)\\right\)/;
  const regex2 = /\\log_{([0-9]+)}\\left\(([0-9]+)\\right\)/;
  const found = regex.exec(latex) || regex2.exec(latex);
  if (!found)
    return setState({
      error: "Please enter a valid log expression",
    });

  mathInput.latex(found[0]);

  setState({
    error: "",
    calculating: true,
  });

  const url =
    "https://us-central1-skyblazar-1578429246615.cloudfunctions.net/calculateLog";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      base: found[1],
      argument: found[2],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setState({
        calculating: false,
      });
    });
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
