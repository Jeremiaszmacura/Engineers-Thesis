import { Link } from 'react-router-dom';

import Card from '../ui/Card';
import styles from './ResponseItem.module.css';


const ResponseItem = (props) => {

    return (
        <li className={styles.item}>
            <Card>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <h2 className={styles.title}>Name: </h2>
                        <h2>{props.name}</h2>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Score: </p>
                        <p>{props.score}</p>
                    </div>
                    <div className={styles.actions}>
                        <Link to={`/response-details/${props.uuid}`}><button>Details</button></Link>
                    </div>
                </div>
            </Card>
        </li>
    );

};


export default ResponseItem;
