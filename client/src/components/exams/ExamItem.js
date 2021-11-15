import Card from '../ui/Card';
import styles from './ExamItem.module.css';

const ExamItem = (props) => {

    const deleteExam = (event) => {
        event.preventDefault();
        fetch(
            'http://localhost:4000/exams/' + props.uuid,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('fetch successful');
                window.location.reload(false);
            } else {
                console.log('fetch NOT successful');
            }
            res.json().then(data => console.log(data));
        });
    };


    return (
        <li className={styles.item}>
            <Card>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <h2 className={styles.title}>Title: </h2>
                        <h2>{props.title}</h2>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Starts At: </p>
                        <p>{props.startsAt}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Ends At: </p>
                        <p>{props.endsAt}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Description: </p>
                        <p>{props.description}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Exam Access Code: </p>
                        <p>{props.accessCode}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button>Edit</button>
                    <button onClick={deleteExam}>Delete</button>
                </div>
            </Card>
        </li>
    );
};

export default ExamItem;
