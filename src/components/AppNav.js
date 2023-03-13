import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const AppNav = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.setUser(null);
    localStorage.setItem("user", null);
  };

  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/crm/">
          CRM
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/crm/addCustomer">
            Dodaj klienta
          </Nav.Link>

          <Nav.Link as={Link} to="/crm/" onClick={logout}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNav;
