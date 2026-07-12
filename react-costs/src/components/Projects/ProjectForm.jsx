import styles from './ProjectForm.module.css'
import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButton'
import { useEffect, useState } from 'react'

function ProjectForm ({ handleSubmit, btnText, projectData }){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('https://6a53d5038547b9f7111bd75e.mockapi.io/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
    e.preventDefault()
    if (!project.name?.trim() || !project.budget || !project.category?.id) {
        alert('Por favor, preencha todos os campos antes de criar ou editar o projeto!')
        return
    }
    
    handleSubmit(project)
}

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto' 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
                />
            <div>
                <Input type='number'
                    text='Orçamento do Projeto'
                    name='budget'
                    placeholder='Insira o orçamento total' 
                    handleOnChange={handleChange}
                    value={project.budget ? project.budget : ''}
                    />
            </div>
            <div>
                <Select name='category_id'
                    text='Selecione a categora' 
                    options={categories} 
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                    />
            </div>
            <div>
                <SubmitButton text={btnText} />
            </div>
        </form>
    )
}

export default ProjectForm