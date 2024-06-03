import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./RegistrationsTable.css";

const RegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/registrations");
      setRegistrations(response.data);
    } catch (error) {
      setErrorMessage("Error fetching registrations. Please try again later.");
    }
  };

  const handleEdit = (registration) => {
    setEditData(registration);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditData(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/register/${id}`);
      fetchRegistrations();
    } catch (error) {
      setErrorMessage("Error deleting registration. Please try again.");
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`http://localhost:5000/register/${id}`, newData);
      handleModalClose();
      fetchRegistrations();
    } catch (error) {
      setErrorMessage("Error updating registration. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={editData?.name || ""}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={editData?.email || ""}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              pattern="[0-9]*"
              value={editData?.phone || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentStatus">Student Status</label>
            <input
              type="text"
              className="form-control"
              id="studentStatus"
              value={editData?.studentStatus || ""}
              onChange={(e) =>
                setEditData({ ...editData, studentStatus: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              className="form-control"
              id="courseName"
              value={editData?.courseName || ""}
              onChange={(e) =>
                setEditData({ ...editData, courseName: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdate(editData._id, editData)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Student Status</th>
            <th>Course Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.phone}</td>
              <td>{registration.studentStatus}</td>
              <td>{registration.courseName}</td>
              <td className="table-actions">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEdit(registration)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleDelete(registration._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationsTable;
