import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import CustomerList from "./components/customer/CustomerList";
import CampaignList from "./components/campaign/CampaignList";

const App = () => {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" >Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/customer">Customer</Nav.Link>
              <Nav.Link as={Link} to="/campaign">Campaigns</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/campaign" element={<CampaignList />} />
      </Routes>
    </Container>
  );
};
export default App;
