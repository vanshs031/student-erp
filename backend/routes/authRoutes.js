const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://127.0.0.1:5500/student-erp/frontend/login.html"
    }),
    (req, res) => {

        const token = jwt.sign(
            {
                id: req.user._id,
                role: req.user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        const user = encodeURIComponent(
            JSON.stringify({
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            })
        );

        res.redirect(
            `http://127.0.0.1:5500/student-erp/frontend/dashboard.html?token=${token}&user=${user}`
        );
    }
);

module.exports = router;