const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const RegisterForm = require("../Model/RegisterForm");

dotenv.config();

const createAdmin = async () => {
  const {
    ADMIN_USERNAME: username,
    ADMIN_EMAIL: email,
    ADMIN_PASSWORD: password,
    ADMIN_ADDRESS: address,
    ADMIN_PHONE: phoneNumber,
    ADMIN_PROFILE: profile,
    ADMIN_QUALIFICATION: qualification,
  } = process.env;

  try {
    const existingAdmin = await RegisterForm.findOne({ email });
    if (existingAdmin) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new RegisterForm({
      username,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      profile,
      qualification,
      role: "admin",
    });

    await admin.save();
  } catch (error) {
    console.error("An error occurred while creating the admin.");
  }
};

module.exports = createAdmin;
