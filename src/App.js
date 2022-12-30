import './App.css';

import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import { useState } from "react";

import About from './About';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import NotFound from './NotFound';

function App() {
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/restaurants?borough=${searchString}`);
    setSearchString("");
  }


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">New York Restaurants</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/restaurants">Full List</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl type="text" placeholder="Borough" className="me-2"
                aria-label="Search" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <Routes>
              <Route exact path="/" element={<Navigate to="/Restaurants" />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/Restaurants" element={<Restaurants />} />
              <Route path="/Restaurant/:id" element={<Restaurant />} />
              <Route element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>

    </>

  )
}

export default App;
