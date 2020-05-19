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
  if (e.keyCode === 13) {
    console.log(mathInput.latex());
  }
};
