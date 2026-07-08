const Student = require("../models/student");

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addStudent = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            course,
            department,
            semester
        } = req.body;

        const student = await Student.create({
            name,
            email,
            mobile,
            course,
            department,
            semester
        });

        res.json({
            message: "Student added successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        await Student.findByIdAndDelete(id);

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            mobile,
            course,
            department,
            semester
        } = req.body;

        const student = await Student.findByIdAndUpdate(
            id,
            {
                name,
                email,
                mobile,
                course,
                department,
                semester
            },
            {
                new: true
            }
        );

        res.json({
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getStudents,
    addStudent,
    deleteStudent,
    updateStudent
};