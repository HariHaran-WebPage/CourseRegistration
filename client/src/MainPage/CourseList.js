import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentStatus: "in",
    courseName: "",
    amount: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (course) => {
    setSelectedCourse(course);
    setFormData((prevData) => ({
      ...prevData,
      courseName: course.title,
      amount: course.amount,
    }));
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("Registration successful");
    } catch (error) {
      console.error("There was an error!", error);
      alert("Registration failed");
    }
    handleClose();
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Course List</h1>
      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={6} lg={4} className="mb-4">
            <div className="course-card p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p>
                  <strong>Amount:</strong> ₹{course.amount}
                </p>
              </div>
              <Button variant="primary" onClick={() => handleShow(course)}>
                Register
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register for {selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentStatus">
              <Form.Label>Student Status</Form.Label>
              <Form.Control
                as="select"
                name="studentStatus"
                value={formData.studentStatus}
                onChange={handleChange}
              >
                <option value="in">In</option>
                <option value="out">Out</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                value={formData.amount}
                readOnly
              />
            </Form.Group>

            <Form.Control
              type="hidden"
              name="courseName"
              value={formData.courseName}
            />

            <Button variant="secondary" onClick={handleClose} className="mr-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CourseList;
