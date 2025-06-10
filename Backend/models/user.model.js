const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [4, "Username must be at least 4 characters long"],
        unique: true,
    },

    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        min: [8, "Password must be at least 8 characters long"],
        match: [/(?=.*[A-Z])(?=.*[@]).{8,}/, "Password must include at least one uppercase letter and one '@' symbol."],
        select: false,
    }
});


userSchema.methods.genAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); 
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;