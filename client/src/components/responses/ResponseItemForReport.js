import CardToPDF from '../ui/CardToPDF';
import styles from './ResponseItemForReport.module.css';


const ResponseItemForReport = (props) => {

    return (
        <li className={styles.item}>
            <CardToPDF>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <h3 className={styles.title}>Name: </h3>
                        <p>{props.name}</p>
                    </div>
                    <div className={styles.element}>
                        <h3 className={styles.title}>Score: </h3>
                        <p>{props.score}</p>
                    </div>
                </div>
            </CardToPDF>
        </li>
    );

};


export default ResponseItemForReport;
