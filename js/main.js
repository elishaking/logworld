// @ts-ignore
const MQ = MathQuill.getInterface(2);

const answerSpan = document.getElementById("math");
// @ts-ignore
const answerMathField = MQ.MathField(answerSpan, {
  handlers: {
    edit: () => {
      const enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
      console.log(enteredMath);
    },
  },
});
