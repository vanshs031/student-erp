const Fee = require("../models/Fee");

// Add Fees
const addFee = async (req, res) => {
    try {

        const { studentId, totalFees, paidFees } = req.body;

        const pendingFees = totalFees - paidFees;

        const status = pendingFees === 0 ? "Paid" : "Pending";

        const fee = await Fee.create({
            studentId,
            totalFees,
            paidFees,
            pendingFees,
            status
        });

        res.json({
            message: "Fees Added Successfully",
            fee
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Fees
const getFees = async (req, res) => {
    try {

        const fees = await Fee.find().populate("studentId");

        res.json(fees);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Fee
const deleteFee = async (req, res) => {
    try {

        await Fee.findByIdAndDelete(req.params.id);

        res.json({
            message: "Fee Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    addFee,
    getFees,
    deleteFee
};