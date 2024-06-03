const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const RegisterForm = require("../Model/RegisterForm");

router.post("/registerForm", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      address,
      phoneNumber,
      profile,
      qualification,
    } = req.body;

    const existingUser = await RegisterForm.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterForm({
      username,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      profile,
      qualification,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/registerForm", async (req, res) => {
  try {
    const users = await RegisterForm.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/registerForm/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await RegisterForm.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/registerForm/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { username, address, phoneNumber, profile, qualification } = req.body;

    const updateData = {
      username,
      address,
      phoneNumber,
      profile,
      qualification,
    };

    const updatedUser = await RegisterForm.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/registerForm/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await RegisterForm.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
