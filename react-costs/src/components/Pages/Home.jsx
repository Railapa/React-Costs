import styles from './Home.module.css'
import savings from '../../imgs/savings.svg'
import { LinkButton } from '../Layout/LinkButton'

export const Home = () => {
    return(
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo</p>
            <LinkButton to="/newproject" text='Criar Projeto'>Criar Projetos</LinkButton>
            <img src={savings} alt="costs" />
        </section>
    )
}