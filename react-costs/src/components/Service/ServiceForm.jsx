import styles from '../Projects/ProjectForm.module.css'
import Input from '../Form/Input'
import SubmitButton from '../Form/SubmitButton'
import { useState } from 'react'

export const ServiceForm = ({ handleSubmit, projectData }) => {

    const [service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault()

        if (!service.name || !service.cost) {
            alert('Por favor, preencha o nome e o custo do serviço!')
            return 
        }

        const formattedService = {
            name: service.name,
            cost: parseFloat(service.cost),
            description: service.description || ''
        }

        const updatedProject = {
            ...projectData,
            services: projectData.services ? [...projectData.services, formattedService] : [formattedService]
        }

        handleSubmit(updatedProject)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange} />

            <Input
                type='number'
                text='Custo do serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange} />

            <Input
                type='text'
                text='Descrição do serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange} />

            <SubmitButton text='Adicionar serviço' />
        </form>
    )
}