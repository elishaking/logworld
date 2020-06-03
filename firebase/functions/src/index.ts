import * as functions from "firebase-functions";

export const calculateLog = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = JSON.parse(req.body);
  const result = Math.log(body.argument) / Math.log(body.base);
  res.json({
    success: true,
    result,
  });
});
