import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import CustomerList from "./components/customer/CustomerList";
import CampaignList from "./components/campaign/CampaignList";
import EmailLogList from "./components/sendmail/EmailLogList";
import Login from "./components/Login/Login";
import PrivateRoute from './PrivateRoute';
import { useAuth } from "./AuthContext";

const App = () => {
  const { token, setToken } = useAuth();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/customer">Customer</Nav.Link>
              <Nav.Link as={Link} to="/campaign">Campaigns</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
          <Route path="/customer" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
          <Route path="/campaign" element={<PrivateRoute><CampaignList /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><EmailLogList /></PrivateRoute>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
