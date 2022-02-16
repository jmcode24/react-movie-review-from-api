import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <>
      <Navbar bg="secondary" variant="dark" className='mb-3'>
        <Container>
          <Navbar.Brand href="#home" className='text-white mx-auto'>Movie Reviewer <span className='text-danger'>&trade;</span></Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;