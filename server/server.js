const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const Register = require("./Router/CourseRegisterRoute");
const RouteCourses = require("./Router/AddCourseRoute");
const RegisterFormRouter = require("./Router/RegisterFormRoute");
const Login = require("./Router/LoginRoute");
const createAdmin = require("./Router/CreateAdminRoute");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", Register);
app.use("/", RouteCourses);
app.use("/", RegisterFormRouter);
app.use("/", Login);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    await createAdmin();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
