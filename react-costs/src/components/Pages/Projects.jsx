import { Message } from "../Layout/Message"
import { useLocation } from 'react-router-dom'
import styles from './Projects.module.css'
import {Container} from '../Layout/Container'
import {LinkButton} from '../Layout/LinkButton'

export const Projects = () => {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message msg={message} type='success' />}
            <Container custonClass='start'>
                <p>Projetos...</p>
            </Container>
        </div>
    )
}