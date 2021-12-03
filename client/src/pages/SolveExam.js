import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../components/ui/Card'
import styles from './SolveExam.module.css';
import SolveQuestionList from '../components/solve/SolveQuestionList'
import SolveExamTakerId from '../components/solve/SolveExamTakerId'


const SolveExamPage = () => {

    const { handle } = useParams(); // Handle params from URL

    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server
    const [sendSovledExam, setSendSovledExam] = useState(false); // Waiting to fetch data form server - contain message
    const [SolutionScore, setSolutionScore] = useState(false); // Waiting to fetch data form server - contain score
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exams
    const [loadedQuestions, setLoadedQuestions] = useState([]); // Loaded Questions



    useEffect(() => {
        // fetch exam from severs

        const enteredExamUuid = handle
        setIsLoading(true);

        fetch(
            `http://localhost:4000/exams/solve/${enteredExamUuid}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((exam) => {
            prepareDateTimeFormat(exam);
            setLoadedExam(exam);
            const questions = [];

            for (const key in exam.questions) {
                const question = {
                    id: key,
                    ...exam.questions[key]
                };

                questions.push(question);
            }
            setLoadedQuestions(questions);
            setIsLoading(false);
        });
        
    }, [handle]);

    const submitHandler = (event) => {
        // Submit new question
        event.preventDefault();

        const enteredExamUuid = handle
        const target   = event.target;
        // holds test taker ID
        const examTakerId = target.elements[0].value
        let solvedExam = [];

        // id = question, name = avaiableanswer
        for (let i = 1; i + 1 < target.length; i++) {
            solvedExam.push(
                {
                     "questionUuid": target.elements[i].id.toString(), 
                     "avaiableAnswerUuid": target.elements[i].name.toString(), 
                     "answer": target.elements[i].value.toString()
                }
            );
        }
        const solvedExamJson = JSON.stringify({"name": examTakerId,"answers": solvedExam})

        fetch(
            `http://localhost:4000/exams/solve/${enteredExamUuid}`,
            {
                method: 'POST',
                body: solvedExamJson,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] submit solve exam - fetch successful');
            } else {
                console.log('[CLIENT] submit solve exam - fetch NOT successful');
            }
            res.json().then(data => {
                setSendSovledExam(data.message);
                if (data.score || data.score === 0) setSolutionScore(String(data.score)); // To string in case the result was 0
            });
        });

    };

    const prepareDateTimeFormat = (exam) => {
        exam.startsAt = "date: " + exam.startsAt.replaceAll('-', '.')
        exam.startsAt = exam.startsAt.replaceAll('T', ', time: ')
        exam.startsAt = exam.startsAt.replaceAll('.000Z', '')
        exam.endsAt = "date: " + exam.endsAt.replaceAll('-', '.')
        exam.endsAt = exam.endsAt.replaceAll('T', ', time: ')
        exam.endsAt = exam.endsAt.replaceAll('.000Z', '')
    };


    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    if(sendSovledExam) {
        return (
            <section>
                <Card>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{sendSovledExam}</h2>
                    </div>
                    {SolutionScore ? (
                        <>
                        <div className={styles.content}>
                            <h2 className={styles.title}>Your score: {SolutionScore}</h2>
                        </div>
                        </>
                    ) : (null)}
                </Card>
            </section>
        )
    }

    return (
        <section>
            <h2>Exam:</h2>
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
            </Card>
            
            
            <form className={styles.form} onSubmit={submitHandler}>
                <h2>Test taker ID:</h2>
                <SolveExamTakerId />
                <h2>Questions:</h2>
                <SolveQuestionList questions={loadedQuestions} />
                <div className={styles.actions}>
                    <button id={styles.submit}>Submit test solution</button>
                </div>
            </form>
            
        </section>
    );
}

export default SolveExamPage;