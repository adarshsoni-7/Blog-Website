const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expire: "1d"
    },
});



const blackListTokenModel = mongoose.model("BlacklistToken", blackListTokenSchema);
module.exports = blackListTokenModel;