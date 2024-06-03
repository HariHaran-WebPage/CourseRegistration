import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    profile: "",
    qualification: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.profile) {
      newErrors.profile = "Profile selection is required";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Qualification selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/registerForm",
          formData
        );

        if (response.status === 201) {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            phoneNumber: "",
            profile: "",
            qualification: "",
          });
          navigate("/");
        } else {
          console.error("Error:", response.data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="registration-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="eye-icon"
                  />
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="eye-icon"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className={`form-control ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="form-group">
            <label>What's your current profile?*</label>
            <select
              className={`form-control ${errors.profile ? "is-invalid" : ""}`}
              name="profile"
              value={formData.profile}
              onChange={handleChange}
            >
              <option value="">Select your profile</option>
              <option value="student">Student</option>
              <option value="graduate">Graduate looking for job</option>
              <option value="workingIT">Working in IT</option>
              <option value="workingNonIT">Working in Non-IT</option>
            </select>
            {errors.profile && (
              <div className="invalid-feedback">{errors.profile}</div>
            )}
          </div>

          <div className="form-group">
            <label>Educational Qualification</label>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qualification"
                  value="Under Graduate"
                  checked={formData.qualification === "Under Graduate"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Under Graduate</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qualification"
                  value="Post Graduate"
                  checked={formData.qualification === "Post Graduate"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Post Graduate</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qualification"
                  value="Diploma"
                  checked={formData.qualification === "Diploma"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Diploma</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qualification"
                  value="HSC"
                  checked={formData.qualification === "HSC"}
                  onChange={handleChange}
                />
                <label className="form-check-label">HSC</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="qualification"
                  value="SSLC"
                  checked={formData.qualification === "SSLC"}
                  onChange={handleChange}
                />
                <label className="form-check-label">SSLC</label>
              </div>
            </div>
            {errors.qualification && (
              <div className="invalid-feedback d-block">
                {errors.qualification}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
