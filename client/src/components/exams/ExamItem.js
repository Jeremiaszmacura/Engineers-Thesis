import Card from '../ui/Card';
import styles from './ExamItem.module.css';

const ExamItem = (props) => {
    return (
        <li className={styles.item}>
            <Card>
                <div className={styles.content}>
                    <h3>Title: {props.title}</h3>
                    <time>Starts At: {props.startsAt}</time>
                    <p>Ends At: {props.endsAt}</p>
                    <p>Description: {props.description}</p>
                    <p>Exam Access Code: {props.accessCode}</p>
                </div>
                <div className={styles.actions}>
                    <button>Edit</button>
                </div>
            </Card>
        </li>
    );
}

export default ExamItem;
