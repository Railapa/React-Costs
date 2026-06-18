import styles from './LinkButton.module.css'
import {Link} from 'react-router-dom'

export const LinkButton = ({to, text}) => {
    return(
        <div>
            <Link to={to} className={styles.btn}>
                {text}
            </Link>
        </div>
    )
}