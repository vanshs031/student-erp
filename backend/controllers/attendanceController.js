const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;

        const attendance = await Attendance.create({
            studentId,
            date,
            status
        });

        res.json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate("studentId");

        res.json(attendance);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    markAttendance,
    getAttendance
};