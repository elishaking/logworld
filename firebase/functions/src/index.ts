import * as functions from "firebase-functions";

export const calculateLog = functions.https.onRequest((req, res) => {
  res.json({
    success: true,
    result: 0,
  });
});
