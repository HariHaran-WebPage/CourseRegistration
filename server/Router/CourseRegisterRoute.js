const express = require("express");
const router = express.Router();
const Registration = require("../Model/Register");
const Course = require("../Model/Course");

router.post("/register", async (req, res) => {
  const { name, email, phone, studentStatus, courseName } = req.body;

  try {
    const registration = new Registration({
      name,
      email,
      phone,
      studentStatus,
      courseName,
    });

    await registration.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

router.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
});

router.put("/register/:id", async (req, res) => {
  const { name, email, phone, studentStatus, courseName } = req.body;

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, studentStatus, courseName },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ message: "Error updating registration" });
  }
});

router.delete("/register/:id", async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting registration" });
  }
});

module.exports = router;
