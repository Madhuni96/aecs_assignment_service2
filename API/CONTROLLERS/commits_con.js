const mongoose = require("mongoose");
const Commit = require("../MODELS/commits_mod");
const Score = require("../MODELS/score_mod");
const fetch = require("node-fetch");

exports.get_commits = () => {
    return new Promise((resolve, reject) => {
      Commit.find()
        .select("_id org repo commits")
        .exec()
        .then((result) => {
          resolve({ status: 201, data: result });
            
        })
        .catch(() => {
          reject({ status: 500, error: "Server error" });
        });
    });
  };









