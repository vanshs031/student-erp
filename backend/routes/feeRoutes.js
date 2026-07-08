const express = require("express");
const router = express.Router();

const {
    addFee,
    getFees,
    deleteFee
} = require("../controllers/feeController");

router.post("/", addFee);
router.get("/", getFees);
router.delete("/:id", deleteFee);

module.exports = router;