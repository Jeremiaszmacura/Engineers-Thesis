import { Link } from 'react-router-dom';
import { useState } from 'react';

import Card from '../ui/Card';
import styles from './ExamItem.module.css';

const ExamItem = (props) => {

    const [deletedItem, setDeletedItem] = useState(false);

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
                console.log('[CLIENT] delete exam - fetch successful');
                setDeletedItem(true);
            } else {
                console.log('[CLIENT] delete exam - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] delete exam - ' + data));
        });
    };


    return (
        <li className={styles.item}>
            {deletedItem ? (null) : (
                <>
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
                                <p className={styles.title}>Points To Get: </p>
                                <p>{props.pointsToGet}</p>
                            </div>
                            
                            <div className={styles.element}>
                                <p className={styles.title}>Test Access Code: </p>
                                <p>{props.accessCode}</p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Link to={`/edit-exam/${props.uuid}`}><button>Manage</button></Link>
                            <button onClick={deleteExam}>Delete</button>
                        </div>
                    </Card>
                </>
            )}
        </li>
    );
};

export default ExamItem;
