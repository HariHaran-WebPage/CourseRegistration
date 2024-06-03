import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Course.css";

const CourseInput = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    amount: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setCourses(response.data);
    } catch (error) {
      setErrorMessage("Error fetching courses. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/add", formData);
      setCourses([...courses, response.data]);
      setFormData({ title: "", description: "", amount: "" });
    } catch (error) {
      setErrorMessage("Error saving course. Please try again.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/${editingCourse}`,
        editFormData
      );
      setCourses(
        courses.map((course) =>
          course._id === editingCourse ? response.data : course
        )
      );
      setEditingCourse(null);
      setShowModal(false);
    } catch (error) {
      setErrorMessage("Error updating course. Please try again.");
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setEditFormData({
      title: course.title,
      description: course.description,
      amount: course.amount,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      setErrorMessage("Error deleting course. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h1>Add a New Course</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCourseTitle" className="form-group">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="formCourseDescription"
              className="form-group"
            >
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCourseAmount" className="form-group">
              <Form.Label>Course Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter course amount"
                required
              />
            </Form.Group>
            <div className="button-container">
              <Button variant="primary" type="submit">
                Add Course
              </Button>
            </div>
          </Form>
          <h2 className="mt-5">Courses List</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.amount}</td>
                  <td className="table-actions">
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(course)}
                    >
                      <FaEdit />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(course._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="modalFormCourseTitle" className="form-group">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                placeholder="Enter course title"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="modalFormCourseDescription"
              className="form-group"
            >
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Enter course description"
                required
              />
            </Form.Group>
            <Form.Group
              controlId="modalFormCourseAmount"
              className="form-group"
            >
              <Form.Label>Course Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={editFormData.amount}
                onChange={handleEditChange}
                placeholder="Enter course amount"
                required
              />
            </Form.Group>
            <div className="button-container">
              <Button variant="primary" type="submit">
                Update Course
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CourseInput;
