
const { uuidv4 } = require("uuid");
const { navBar, navBrand, nav } =require( "./index");
const { Navbar, Nav } =require( "react-bootstrap")
const { navbarBrand, navs } =require( "../../config/config")
const { LinkContainer } =require( "react-router-bootstrap")


function NavBar() {
  return (
    <Navbar style={navBar} variant="dark" expand="lg" fixed="top">
      <Navbar.Brand style={navBrand} href="/">{navbarBrand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={nav} className="mr-auto">
          {navs.map(navs =>
            <LinkContainer to={navs.page} key={uuidv4()}>
              <Nav.Link className="ml-2">{navs.nav}</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;