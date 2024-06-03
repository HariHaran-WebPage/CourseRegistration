import React, { useState, useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserLogin = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setUserDetails(JSON.parse(user));
      }
    };

    window.addEventListener("userLoggedIn", handleUserLogin);
    return () => window.removeEventListener("userLoggedIn", handleUserLogin);
  }, []);

  const toggleShow = () => setShow(!show);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserDetails(null);
    navigate("/");
  };

  const handleCoursesList = () => {
    navigate("/courses");
  };

  const handleAddUser = () => {
    navigate("/add-course");
  };

  const handleUserTable = () => {
    navigate("/users");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="header-container">
          <h1 className="header-title">Course List</h1>
          <Nav className="ml-auto">
            {userDetails && (
              <Dropdown show={show} onToggle={toggleShow}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fas fa-user"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.ItemText>
                    <strong>Name:</strong> {userDetails.username}
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <strong>Email:</strong> {userDetails.email}
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <strong>Phone:</strong> {userDetails.phoneNumber}
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <strong>Address:</strong> {userDetails.address}
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <strong>Profile:</strong> {userDetails.profile}
                  </Dropdown.ItemText>
                  <Dropdown.ItemText>
                    <strong>Qualification:</strong> {userDetails.qualification}
                  </Dropdown.ItemText>

                  <Dropdown.Divider />
                  {userDetails.role === "admin" && (
                    <>
                      <Dropdown.Item onClick={handleCoursesList}>
                        Course List
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleAddUser}>
                        Add Course
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleUserTable}>
                        User Table
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
