import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../components/ui/Card'
import styles from './EntrySolveExam.module.css';


const SolveExamPage = () => {

    const { handle } = useParams(); // Handle params from URL

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exams
    const [startExamError, setStartExamError] = useState(null);

    const prepareDateTimeFormat = (exam) => {
        exam.startsAt = "date: " + exam.startsAt.replaceAll('-', '.')
        exam.startsAt = exam.startsAt.replaceAll('T', ', time: ')
        exam.startsAt = exam.startsAt.replaceAll('.000Z', '')
        exam.endsAt = "date: " + exam.endsAt.replaceAll('-', '.')
        exam.endsAt = exam.endsAt.replaceAll('T', ', time: ')
        exam.endsAt = exam.endsAt.replaceAll('.000Z', '')
    };

    useEffect(() => {
        // fetch exam from severs

        const enteredExamCode = handle
        setIsLoading(true);

        fetch(
            'http://localhost:4000/exams/accessCode',
            {
                method: 'POST',
                body: JSON.stringify({"accessCode": enteredExamCode}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            return response.json();
        }).then((exam) => {
            if (typeof(exam) === 'string') return setStartExamError(exam);
            else if (exam){
                prepareDateTimeFormat(exam);
                setLoadedExam(exam);
                setIsLoading(false);
            } else {
                setStartExamError("Something gone wrong");
            }    
        });
        
    }, [handle]);

    const startExamHandler = () => {
        

        fetch(
            `http://localhost:4000/exams/solve-availability/${loadedExam.uuid}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((exam) => {
            if (exam === 'Exam avaiable') return history.push(`/solve-exam/${loadedExam.uuid}`);
            else return setStartExamError(exam);
        });
    }


    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    return (
        <section>
            <Card>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <h2 className={styles.title}>Title: </h2>
                        <h2>{loadedExam.title}</h2>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Starts At: </p>
                        <p>{loadedExam.startsAt}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Ends At: </p>
                        <p>{loadedExam.endsAt}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Description: </p>
                        <p>{loadedExam.description}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Exam Access Code: </p>
                        <p>{loadedExam.accessCode}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={startExamHandler}>Start</button>
                </div>
            </Card>       
            <div className={styles.errorCard}>
                <Card>
                    <div className={styles.errorMessage}>
                        {startExamError && <p>{startExamError}</p>}
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default SolveExamPage;