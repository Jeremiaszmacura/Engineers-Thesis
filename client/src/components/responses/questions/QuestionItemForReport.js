import CardToPDF from '../../ui/CardToPDF';
import styles from './QuestionItemForReport.module.css';

const QuestionItemForReport = (props) => {

    return (
        <ul className={styles.list}>
            <div className={styles.questionitem}>
                <CardToPDF>
                    <div className={styles.content}>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Question {props.number+1}: </h3>
                            <p>{props.question}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Type: </h3>
                            <p>{props.type}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Value: </h3>
                            <p>{props.value}</p>
                        </div>          
                    </div>
                </CardToPDF>
            </div>
        </ul>
    );
};

export default QuestionItemForReport;
