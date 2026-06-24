import styles from '../Projects/ProjectForm.module.css'
import Input from '../Form/Input'
import SubmitButton from '../Form/SubmitButton'
import { useState } from 'react'

export const ServiceForm = ({handleSubmit, projectData}) => {

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
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

            <SubmitButton text='Adicionar serviço'/>
        </form>
    )
}