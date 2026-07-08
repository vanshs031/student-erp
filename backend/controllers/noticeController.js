const Notice = require("../models/Notice");

// Add Notice
const addNotice = async (req, res) => {
    try {
        const { title, message, postedBy } = req.body;

        const notice = await Notice.create({
            title,
            message,
            postedBy
        });

        res.json({
            message: "Notice Added Successfully",
            notice
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Notices
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });

        res.json(notices);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Notice
const deleteNotice = async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);

        res.json({
            message: "Notice Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addNotice,
    getNotices,
    deleteNotice
};