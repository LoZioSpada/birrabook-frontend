import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './style.module.scss'
import cn from 'classnames'

export default function MyNavbar() {
  return (
    <Navbar expand="lg" className={cn(styles.navbg)}>
      <Container className='px-0'>
        <Navbar.Brand href="#home">🍻 Birrabook 🍻</Navbar.Brand>
      </Container>
    </Navbar>
  );
}