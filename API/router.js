const express = require("express");
const router = express.Router();

const score_route = require("./ROUTES/score_route");

router.use("/score", score_route);

module.exports = router;