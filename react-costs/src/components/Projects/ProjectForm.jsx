import styles from './ProjectForm.module.css'
import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButton'

export const ProjectForm = ({btnText}) => {
    return (
        <form className={styles.form}>
            <Input type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto' />
            <div>
                <Input type='number'
                    text='Orçamento do Projeto'
                    name='budget'
                    placeholder='Insira o orçamento total' />
            </div>
            <div>
                <Select name='category_id' 
                text='Selecione a categora' />
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}