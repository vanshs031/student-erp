const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    totalFees: {
        type: Number,
        required: true
    },

    paidFees: {
        type: Number,
        required: true
    },

    pendingFees: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Fee", feeSchema);