import { Link } from 'react-router-dom'
import { Container } from './Container'
import logo from '../../imgs/costs_logo.png'
import styles from './NavBar.module.css'

export const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                    
                </ul>
            </Container>
        </nav>
    )
}