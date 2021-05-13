const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,

    org : {
        type: String,
        required: [true, "Required"],
    },

    repo : {
        type: String,
        required: [true, "Required"],
    },

    userId : {
        type: String,
        required: [true, "Required"],
        unique: true,
    },

    userName : {
        type: String,
        required: [true, "Required"],
        unique: true,
    },

    commitsCount : {
        type: Number,
        required: [true, "Required"],
    },

    issuesCount : {
        type: Number,
        required: [true, "Required"],
    },

    openPullsCount : {
        type: Number,
        required: [true, "Required"],
    },

    closePullsCount : {
        type: Number,
        required: [true, "Required"],
    },
    
    score : {
        type: Number,
        required: [true, "Required"],
    },
})

module.exports = mongoose.model("Score", scoreSchema);