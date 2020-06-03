const state = {
  calculating: false,
  error: "",
  answer: "",
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
  const regex2 = /\\log_{([0-9]+| )}\\left\(([0-9]+)\\right\)/;
  const found = regex.exec(latex) || regex2.exec(latex);
  console.log(found, latex);

  if (!found)
    return setState({
      error: "Please enter a valid log expression",
    });

  mathInput.latex(found[0].replace(" ", "2"));
  const base = found[1] === " " ? 2 : found[1];

  setState({
    error: "",
    calculating: true,
  });

  const controller = new AbortController();
  const signal = controller.signal;

  const timeout = setTimeout(() => {
    controller.abort();
    setState({
      calculating: false,
      answer: Math.log(parseInt(found[2])) / Math.log(parseInt(found[1])),
    });
  }, 3000);

  const url =
    "https://us-central1-skyblazar-1578429246615.cloudfunctions.net/calculateLog";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      base,
      argument: found[2],
    }),
    signal,
  })
    .then((res) => res.json())
    .then((data) => {
      clearTimeout(timeout);
      setState({
        calculating: false,
        answer: data.result,
      });
    });
};

const errorDiv = document.getElementById("error");
const calculatingDiv = document.getElementById("calculating");
const answerDiv = document.getElementById("answer");
const setState = ({
  calculating = undefined,
  error = undefined,
  answer = undefined,
}) => {
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

  if (answer !== undefined) {
    answerDiv.textContent = answer;
  }
};
