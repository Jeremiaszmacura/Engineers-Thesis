import { useState, useEffect } from 'react';

import ExamList from "../components/exams/ExamList";

const AllExamsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedExams, setLoadedExams] = useState([]);

    useEffect(() => {
        setIsLoading(true); 
        fetch(
            'http://localhost:4000/exams'
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
            <h1>All Exams Page</h1>
            <ExamList exams={loadedExams} />
        </section>
    );
}

export default AllExamsPage;