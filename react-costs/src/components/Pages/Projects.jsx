import { Message } from "../Layout/Message"
import { useLocation } from 'react-router-dom'
import styles from './Projects.module.css'
import { Container } from '../Layout/Container'
import { LinkButton } from '../Layout/LinkButton'
import { ProjectCard } from "../Projects/ProjectCard"
import { useState, useEffect } from "react"
import { Loading } from "../Layout/Loading"

export const Projects = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState(``)

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'apllication/json'
            }
        }).then(resp => resp.json())
            .then(data => {
                setProjects(data)
                console.log(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'apllication/json'
            },
        }).then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                console.log(data)
                setProjectMessage('Projeto removido com sucesso')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message msg={message} type='success' />}
            {projectMessage && <Message msg={projectMessage} type='error' />}
            <Container custonClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category?.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}