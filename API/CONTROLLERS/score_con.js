const mongoose = require("mongoose");
const Commit = require("../MODELS/commits_mod");
const Issue = require("../MODELS/issues_mod");
const Pull = require("../MODELS/pulls_mod");
const Score = require("../MODELS/score_mod");

    

exports.get_data = (body) => {

    let org = body.org;
    let repo = body.repo;

    let commits_Array = [];
    let issues_Array = [];
    let pulls_Array = [];

    return new Promise((resolve, reject) => {

        Commit.find()
            .select("_id org repo commits")
            .exec()
            .then((result) => {
                result.map(r => {
                    if((r.org === org) && (r.repo === repo)){
                        commits_Array.push(r.commits); 
                    }    
                })  
                resolve({ status: 201, data: result }); 
            })
            .catch(() => {
                reject({ status: 500, error: "Server error" });
            });
            

        Issue.find()
            .select("_id org repo issues")
            .exec()
            .then((result) => {
                result.map(r => {
                    if((r.org === org) && (r.repo === repo)){
                        issues_Array.push(r.issues); 
                    }
                })
                resolve({ status: 201, data: result });  
            })
            .catch(() => {
                reject({ status: 500, error: "Server error" });
            });

        Pull.find()
            .select("_id org repo pulls")
            .exec()
            .then((result) => {
                result.map(r => {
                    if((r.org === org) && (r.repo === repo)){
                        pulls_Array.push(r.pulls); 
                    }
                })
                resolve({ status: 201, data: result });  
            })
            .catch(() => {
                reject({ status: 500, error: "Server error" });
            });

            setTimeout(calculate_score, 10000,commits_Array,issues_Array,pulls_Array,org,repo,resolve,reject);
    });

        
    
  };

  function calculate_score(commits_Array,issues_Array,pulls_Array,org,repo,resolve,reject){

    pulls_Array.forEach(element => {
        for(let i = 0; i < element.length; i++){
            let pId = element[i].id;
            let name = element[i].name;
            let pOCount = element[i].openCount;
            let pCCount = element[i].closeCount;
            let iCount, cCount, scoreC;

            issues_Array.forEach(element1 => {
                if(element1.find(e => e.id === pId) === undefined){

                    iCount = 0;

                    commits_Array.forEach(element2 => {
                            if(element2.find(e => e.id === pId) === undefined){
                                cCount = 0;
                                scoreC = (0.5 * cCount) + (1.5 * (pOCount + pCCount)) - (0.5 * iCount);
                                console.log("Id1: ",pId, " Commits1: ",cCount, " Issues1: ",iCount, " Open1: ",pOCount, " Close1: ",pCCount, " Score1: ",scoreC);
                                const score = new Score({
                                    _id: mongoose.Types.ObjectId(),
                                    org: org,
                                    repo: repo,
                                    userId: pId,
                                    userName: name,
                                    commitsCount: cCount,
                                    issuesCount: iCount,
                                    openPullsCount: pOCount,
                                    closePullsCount: pCCount,
                                    score: scoreC
                                });
                                    score
                                        .save()
                                        .then(() => {
                                            resolve({ status: 201, message: "success" });
                                        })
                                        .catch((err) => {
                                            const validation_errors = err.validation_errors;
                                            console.log(err);
                                            if (validation_errors) {
                                                reject({ status: 422, error: validation_errors });
                                            } else {
                                                reject({ status: 500, error: "Server error" });
                                            }
                                        }); 
                            }else{
                                cCount = element2.find(e => e.id === pId).count;
                                scoreC = (0.5 * cCount) + (1.5 * (pOCount + pCCount)) - (0.5 * iCount);
                                console.log("Id: ",pId, " Commits: ",cCount, " Issues: ",iCount, " Open: ",pOCount, " Close: ",pCCount, " Score: ",scoreC);
                                const score = new Score({
                                    _id: mongoose.Types.ObjectId(),
                                    org: org,
                                    repo: repo,
                                    userId: pId,
                                    userName: name,
                                    commitsCount: cCount,
                                    issuesCount: iCount,
                                    openPullsCount: pOCount,
                                    closePullsCount: pCCount,
                                    score: scoreC
                                });
                                    score
                                        .save()
                                        .then(() => {
                                            resolve({ status: 201, message: "success" });
                                        })
                                        .catch((err) => {
                                            const validation_errors = err.validation_errors;
                                            console.log(err);
                                            if (validation_errors) {
                                                reject({ status: 422, error: validation_errors });
                                            } else {
                                                reject({ status: 500, error: "Server error" });
                                            }
                                        }); 
                            }
                        })
                }else{
                    iCount = element1.find(e => e.id === pId).count;

                    commits_Array.forEach(element2 => {
                        if(element2.find(e => e.id === pId) === undefined){
                            cCount = 0;
                            scoreC = (0.5 * cCount) + (1.5 * (pOCount + pCCount)) - (0.5 * iCount);
                            console.log("Id1: ",pId, " Commits1: ",cCount, " Issues1: ",iCount, " Open1: ",pOCount, " Close1: ",pCCount, " Score1: ",scoreC);
                            const score = new Score({
                                _id: mongoose.Types.ObjectId(),
                                org: org,
                                repo: repo,
                                userId: pId,
                                userName: name,
                                commitsCount: cCount,
                                issuesCount: iCount,
                                openPullsCount: pOCount,
                                closePullsCount: pCCount,
                                score: scoreC
                            });
                                score
                                    .save()
                                    .then(() => {
                                        resolve({ status: 201, message: "success" });
                                    })
                                    .catch((err) => {
                                        const validation_errors = err.validation_errors;
                                        console.log(err);
                                        if (validation_errors) {
                                            reject({ status: 422, error: validation_errors });
                                        } else {
                                            reject({ status: 500, error: "Server error" });
                                        }
                                    }); 
                        }else{
                            cCount = element2.find(e => e.id === pId).count;
                            scoreC = (0.5 * cCount) + (1.5 * (pOCount + pCCount)) - (0.5 * iCount);
                            console.log("Id: ",pId, " Commits: ",cCount, " Issues: ",iCount, " Open: ",pOCount, " Close: ",pCCount, " Score: ",scoreC);
                            
                                  
                            const score = new Score({
                                _id: mongoose.Types.ObjectId(),
                                org: org,
                                repo: repo,
                                userId: pId,
                                userName: name,
                                commitsCount: cCount,
                                issuesCount: iCount,
                                openPullsCount: pOCount,
                                closePullsCount: pCCount,
                                score: scoreC
                            });
                                score
                                    .save()
                                    .then(() => {
                                        resolve({ status: 201, message: "success" });
                                    })
                                    .catch((err) => {
                                        const validation_errors = err.validation_errors;
                                        console.log(err);
                                        if (validation_errors) {
                                            reject({ status: 422, error: validation_errors });
                                        } else {
                                            reject({ status: 500, error: "Server error" });
                                        }
                                    }); 

                        }
                    })                 
                }
            })
        }      
    });
  }