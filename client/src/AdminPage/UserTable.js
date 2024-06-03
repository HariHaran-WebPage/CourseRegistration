import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserTable.css"; // Import the custom CSS
import RegistrationsTable from "./CourseRegsiterForm";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phoneNumber: "",
    profile: "",
    qualification: "",
  });
  const [errors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/registerForm");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/registerForm/${email}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.email);
    setFormData(user);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/registerForm/${editingUser}`, {
        username: formData.username,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        profile: formData.profile,
        qualification: formData.qualification,
      });
      setEditingUser(null);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Profile</th>
            <th>Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.profile}</td>
              <td>{user.qualification}</td>
              <td className="table-actions">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                pattern="[0-9]*"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <div>
        <RegistrationsTable />
      </div>
    </div>
  );
};

export default UserTable;
