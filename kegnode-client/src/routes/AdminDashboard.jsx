import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const AdminDashboard = () => {
  return (
    <Container>
      <Nav variant="pills" className="justify-content-end">
        {/* <Nav.Item>
          <LinkContainer to={`/admin/taps`}>
            <Nav.Link>Taps Admin</Nav.Link>
          </LinkContainer>
        </Nav.Item> */}
        <Nav.Item>
          <LinkContainer to={`/admin/kegs`}>
            <Nav.Link>Kegs Admin</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};

export default AdminDashboard;
