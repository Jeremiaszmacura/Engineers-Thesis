import Card from '../ui/Card';
import styles from './QuestionItem.module.css';

const AvaiableAnswerItem = (props) => {

    return (
        <li className={styles.item2}>
            <Card>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <p className={styles.title}>Answer: </p>
                        <p>{props.answer}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Is Correct: </p>
                        <p>{props.isCorrect}</p>
                    </div>
                </div>
            </Card>
        </li>
    );
};

export default AvaiableAnswerItem;
