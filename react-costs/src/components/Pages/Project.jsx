import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useEffect, useState } from 'react'
import { Loading } from '../Layout/Loading'
import { Container } from '../Layout/Container'
import ProjectForm from '../Projects/ProjectForm'
import { Message } from '../Layout/Message'
import { ServiceForm } from '../Service/ServiceForm'
import { v4 as uuidv4 } from 'uuid'
import { ServiceCard } from '../Service/ServiceCard'

export const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [services, setServices] = useState([])
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
    }, [id])

    function editPost(project) {
        setMessage('')

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')
            })
            .catch(err => console.log(err))
    }

    function createService(project) {
    setMessage('')

    if ((parseFloat(project.cost) || 0) >= parseFloat(project.budget)) {
        alert('Atenção: O orçamento deste projeto já foi 100% utilizado! Não é possível adicionar novos serviços.')
        project.services.pop() 
        return false
    }

    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = (parseFloat(project.cost) || 0) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado, verifique o valor do serviço.')
        setType('error')
        project.services.pop()
        return false
    }

    project.cost = newCost

    fetch(`https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project),
    }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
            setMessage('Serviço adicionado com sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
}

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id,
        )

        const projectUpdated = { ...project }

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`https://6a53d5038547b9f7111bd75e.mockapi.io/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProject(projectUpdated)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
                setType('success')
            })
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }


    const totalBudget = parseFloat(project.budget) || 0
    const currentCost = parseFloat(project.cost) || 0

    const percent = totalBudget > 0 ? Math.min((currentCost / totalBudget) * 100, 100) : 0

    let progressBarColor = '#22c55e'

    if (percent > 80) {
        progressBarColor = '#ef4444'
    } else if (percent > 50) {
        progressBarColor = '#eab308'
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>

                            {!showProjectForm ? (
                                <div className={styles.form}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>

                                    <div className={styles.progress_bar_container}>
                                        <div
                                            className={styles.progress_bar_fill}
                                            style={{
                                                width: `${percent}%`,
                                                backgroundColor: progressBarColor
                                            }}
                                        ></div>
                                    </div>
                                    <small style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                                        {percent.toFixed(0)}% do orçamento utilizado
                                    </small>

                                </div>
                            ) : (
                                <ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicone um serviço</h2>
                            <button onClick={toggleServiceForm} className={styles.btn}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>

                            <div className={styles.form}>
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText='Adicionar serviço' projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))}

                            {services.length === 0 &&
                                <p>Não há serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
            )
                :

                (<Loading />)
            }
        </>
    )
}