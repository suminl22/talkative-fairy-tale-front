import react from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'

const Header = () => {
  return(
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>이야기 놀이터</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="ml-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Logout</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;