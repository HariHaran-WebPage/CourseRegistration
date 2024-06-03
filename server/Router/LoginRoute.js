const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const RegisterForm = require("../Model/RegisterForm");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterForm.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("An error occurred while logging in.");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
