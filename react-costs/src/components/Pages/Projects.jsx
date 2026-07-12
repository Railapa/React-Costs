import { Message } from "../Layout/Message"
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container } from '../Layout/Container'
import { LinkButton } from '../Layout/LinkButton'
import { ProjectCard } from '../Projects/ProjectCard'
import styles from './Projects.module.css'

export const Projects = () => {
    const [projects, setProjects] = useState([])
    const [activeFilter, setActiveFilter] = useState('Todos')
    
    // 1. ESTADO PARA A PESQUISA POR NOME
    const [searchTerm, setSearchTerm] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${projectUpdated.id}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function removeProject(id) {
        fetch(`https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
        })
        .catch(err => console.log(err))
    }

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = activeFilter === 'Todos' || project.category?.name === activeFilter
        const matchesName = project.name?.toLowerCase().includes(searchTerm.toLowerCase())
        
        return matchesCategory && matchesName
    })

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>

            {message && <Message msg={message} type='success' />}

            <div className={styles.toolbar_container}>
                <input 
                    type="text" 
                    placeholder="Pesquisar projeto por nome..."
                    className={styles.search_input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className={styles.filter_container}>
                    {['Todos', 'Infra', 'Desenvolvimento', 'Design', 'Planejamento'].map((category) => (
                        <button
                            key={category}
                            className={`${styles.filter_btn} ${activeFilter === category ? styles.active : ''}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <Container customClass='start'>
                {filteredProjects.length > 0 &&
                    filteredProjects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category?.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}

                {filteredProjects.length === 0 && (
                    <p>Nenhum projeto encontrado para a sua busca.</p>
                )}
            </Container>
        </div>
    )
}