import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { Container } from './Container'
import { ThemeContext } from './ThemeContext' 
import { BsSunFill, BsMoonFill } from 'react-icons/bs'
import logo from '../../imgs/costs_logo.png'
import styles from './Navbar.module.css'

export const NavBar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                    
                    <li>
                        <button onClick={toggleTheme} className={styles.theme_btn}>
                            {theme === 'light' ? <BsMoonFill /> : <BsSunFill />}
                        </button>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}