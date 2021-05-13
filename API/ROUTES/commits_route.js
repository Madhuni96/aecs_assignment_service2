const express = require("express");
const router = express.Router();
const CommitController = require("../CONTROLLERS/commits_con");
const CheckAPI = require("../MIDDLEWARES/check_api");


router.get("/", CheckAPI, (req, res, next) => {
    CommitController.get_commits()
      .then((result) => {
        res.status(result.status).json(result.data);
      })
      .catch((err) => {
        res.error(err.status).json(err.error);
      });
  });

  module.exports=router;