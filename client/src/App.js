import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./LoginForm/Login";
import CourseList from "./MainPage/CourseList";
import Header from "./Top/Header";
import Footer from "./Bottom/Footer";
import CourseFinder from "./LoginForm/RegisterForm";
import UserTable from "./AdminPage/UserTable";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CourseInput from "./AdminPage/AddCourse";
import RegistrationForm from "./LoginForm/RegisterForm";
import "./App.css";

const App = () => {
  const location = useLocation();
  const showHeaderFooter = !(
    location.pathname === "/" || location.pathname === "/register"
  );

  return (
    <div className="app-container">
      {showHeaderFooter && <Header />}
      <div className="content-wrap container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/add-course" element={<CourseInput />} />
          <Route path="/add" element={<CourseFinder />} />
          <Route path="/users" element={<UserTable />} />
        </Routes>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
