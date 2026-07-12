import { useNavigate } from 'react-router-dom'

import ProjectForm from '../Projects/ProjectForm'

import styles from './NewProject.module.css'

export function NewProject() {
    const navigate = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch('https://6a53d5038547b9f7111bd75e.mockapi.io/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
            })
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}