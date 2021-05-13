const express = require("express");
const router = express.Router();
const ScoreController = require("../CONTROLLERS/score_con");
const CheckAPI = require("../MIDDLEWARES/check_api");


router.get("/", CheckAPI, (req, res, next) => {
    const body = req.body;
    ScoreController.get_data(body)
      .then((result) => {
        res.status(result.status).json(result.data);
      })
      .catch((err) => {
        res.error(err.status).json(err.error);
      });
  });

  module.exports=router;