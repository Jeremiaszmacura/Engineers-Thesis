import { useState, useEffect } from 'react';

import Card from '../components/ui/Card';
import ExamList from "../components/exams/ExamList";
import styles from './MyExams.module.css'

const AllExamsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedExams, setLoadedExams] = useState([]);

    const prepareDateTimeFormat = (exams) => {
        exams.forEach((exam) => {
            exam.startsAt = "date: " + exam.startsAt.replaceAll('-', '.')
            exam.startsAt = exam.startsAt.replaceAll('T', ', time: ')
            exam.startsAt = exam.startsAt.replaceAll('.000Z', '')
            exam.endsAt = "date: " + exam.startsAt.replaceAll('-', '.')
            exam.endsAt = exam.startsAt.replaceAll('T', ', time: ')
            exam.endsAt = exam.startsAt.replaceAll('.000Z', '')
        });
    };

    useEffect(() => {
        setIsLoading(true); 
        fetch(
            'http://localhost:4000/exams/my-exams',
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            const exams = [];

            for (const key in data) {
                const exam = {
                    id: key,
                    ...data[key]
                };

                exams.push(exam);
            }

            setIsLoading(false);
            prepareDateTimeFormat(exams)
            setLoadedExams(exams);
        });
    }, []);

    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <section>
            {loadedExams[0] ? (
                <>
                <h1>My Exams</h1>
                <ExamList exams={loadedExams} />
                </>
            ) : (
                <>
                    <div className={styles.container}>
                        <Card>
                            <h2 className={styles.title}>You do not have any created tests yet</h2>
                            <p className={styles.description}>
                                To create test go to "Create Exam" section...
                            </p>
                        </Card>
                    </div>
                </>
            )}
            
        </section>
    );
}

export default AllExamsPage;