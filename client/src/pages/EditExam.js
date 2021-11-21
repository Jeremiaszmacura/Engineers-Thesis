import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Card from '../components/ui/Card'
import styles from './EditExam.module.css'
import QuestionList from "../components/exams/QuestionList";


const EditExamPage = () => {
    const { handle } = useParams(); // Handle params from URL
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exams
    const [loadedQuestions, setLoadedQuestions] = useState([]); // Loaded Questions
    const [addQuestion, setAddQuestion] = useState(false); // Add Question - display form
    const [singleChoiceQuestion, setSingleChoiceQuestion] = useState(true); // Set Question Type
    const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState(false); // Set Question Type
    const [openQuestion, setOpenQuestion] = useState(false); // Set Question Type
    const [trueOrFalseQuestion, setTrueOrFalsQuestion] = useState(false); // Set Question Type
    const [numberOfAvaliableAnswers, setNumberOfAvaliableAnswers] = useState(2); // Set number of avaliable answers
    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server

    const questionInputRef = useRef();
    const typeInputRef = useRef();
    const numberOfAvaliableAnswersInputRef = useRef();

    const history = useHistory();


    useEffect(() => {
        // fetch exam from severs
        setIsLoading(true);
        fetch(
            `http://localhost:4000/exams/${handle}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((exam) => {
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

    const deleteExam = (event) => {
        event.preventDefault();
        fetch(
            'http://localhost:4000/exams/' + loadedExam.uuid,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] delete exam - fetch successful');
                history.replace('/');
            } else {
                console.log('[CLIENT] delete exam - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] delete exam - '+data));
        });
    };

    const handleKeyDown = (e) => {
        // Adjust size of textarea
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
      };

    const submitHandler = (event) => {
        // Submit new question
        event.preventDefault();

        const enteredQuestionInputRef = questionInputRef.current.value;
        const enteredTypeInputRef = typeInputRef.current.value;
        const avaliableAnswers = [];
        const eventTargetLength = event.target.length

        if (enteredTypeInputRef === "open") {
            const answerItem = {
                answer: event.target[2].value,
                isCorrect: "true"
            }
            avaliableAnswers.push(answerItem)
        }
        if (enteredTypeInputRef === "trueOrFalse") {
            const answerItem = {
                answer: enteredQuestionInputRef,
                isCorrect: event.target[2].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 5) {
            const answerItem = {
                answer: event.target[3].value,
                isCorrect: event.target[4].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 6) {
            const answerItem = {
                answer: event.target[5].value,
                isCorrect: event.target[6].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 8) {
            const answerItem = {
                answer: event.target[7].value,
                isCorrect: event.target[8].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 10) {
            const answerItem = {
                answer: event.target[9].value,
                isCorrect: event.target[10].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 12) {
            const answerItem = {
                answer: event.target[11].value,
                isCorrect: event.target[12].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 14) {
            const answerItem = {
                answer: event.target[13].value,
                isCorrect: event.target[14].value
            }
            avaliableAnswers.push(answerItem)
        }

        
        const createdQuestion = {
            question: enteredQuestionInputRef,
            type: enteredTypeInputRef,
            avaliableAnswers: avaliableAnswers
        };    

        fetch(
            `http://localhost:4000/questions/create/${handle}`,
            {
                method: 'POST',
                body: JSON.stringify(createdQuestion),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] create question - fetch successful');
            } else {
                console.log('[CLIENT] create question - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] create question - '+data));
            window.location.reload(false);
        });

    };

    const addingQuestionSwitch = () => {
        if (addQuestion) {
            setAddQuestion(false);
            setSingleChoiceQuestion(true);
            setMultipleChoiceQuestion(false);
            setOpenQuestion(false);
            setTrueOrFalsQuestion(false);
        }
        else setAddQuestion(true);
    }

    const changeQuestionType = () => {
        // question type to display the appropriate form
        const enteredTypeInputRef = typeInputRef.current.value;
        setNumberOfAvaliableAnswers(2);
        setSingleChoiceQuestion(false);
        setMultipleChoiceQuestion(false);
        setOpenQuestion(false);
        setTrueOrFalsQuestion(false);
        if (enteredTypeInputRef === "singleChoice") setSingleChoiceQuestion(true);
        else if (enteredTypeInputRef === "multipleChoice") setMultipleChoiceQuestion(true);
        else if (enteredTypeInputRef === "open") setOpenQuestion(true);
        else if (enteredTypeInputRef === "trueOrFalse") setTrueOrFalsQuestion(true);
    };

    const changeNumberOfAvaibleAnswers = () => {
        setNumberOfAvaliableAnswers(Number(numberOfAvaliableAnswersInputRef.current.value));
    };


    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    return (
        <div className={styles.page}>

            <h1>Edit Exam</h1>
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
                    <button>Edit</button>
                    <button onClick={deleteExam}>Delete</button>
                </div>
            </Card>

            <h1>Manage Questions</h1>

            <div className={styles.manage}>
                <button onClick={addingQuestionSwitch}>Add Question</button>
            </div>

            {addQuestion ? (
                <>
                    <Card>
                    <div className={styles.content}>
                        <h2>Creating question:</h2>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <div className={styles.control}>
                                <label htmlFor='question'>question</label>
                                <textarea onKeyDown={handleKeyDown} type='text' required id='question' ref={questionInputRef} />
                            </div>
                            <div className={styles.control}>
                                <label htmlFor='newPassword'>type</label>
                                <select ref={typeInputRef} onChange={changeQuestionType}>
                                    <option defaultValue value="singleChoice">Signle Choice</option>
                                    <option value="multipleChoice">Multiple Choice</option>
                                    <option value="open">Open</option>
                                    <option value="trueOrFalse">True/False</option>
                                </select>
                            </div>
                            
                            {singleChoiceQuestion ? (
                                <>  
                                    <div className={styles.control}>
                                        <label htmlFor='newPassword'>Number of avaliable answers</label>
                                        <select ref={numberOfAvaliableAnswersInputRef} onChange={changeNumberOfAvaibleAnswers}>
                                            <option defaultValue value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    {numberOfAvaliableAnswers ? (
                                        <>
                                        {
                                            [...Array(numberOfAvaliableAnswers)].map((e, i) => 
                                            <div className={styles.control} key={i}>
                                                <div className={styles.answers}>
                                                    <label htmlFor='answer'>Avaliable Answer</label>
                                                    <textarea onKeyDown={handleKeyDown} type='text' required id={"answer"+i}/>
                                                    <label htmlFor='isCorrect'>Is Correct</label>
                                                    <select>
                                                        <option defaultValue value="flase">false</option>
                                                        <option value="true">true</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )
                                        }
                                        </>
                                        ):(null)}
                                </>
                            ) : (null) }
                            {multipleChoiceQuestion ? (
                                <>  
                                <div className={styles.control}>
                                    <label htmlFor='newPassword'>Number of avaliable answers</label>
                                    <select ref={numberOfAvaliableAnswersInputRef} onChange={changeNumberOfAvaibleAnswers}>
                                        <option defaultValue value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                {numberOfAvaliableAnswers ? (
                                    <>
                                    {
                                        [...Array(numberOfAvaliableAnswers)].map((e, i) => 
                                        <div className={styles.control} key={i}>
                                            <div className={styles.answers}>
                                                <label htmlFor='answer'>Avaliable Answer</label>
                                                <textarea onKeyDown={handleKeyDown} type='text' required id={"answer"+i}/>
                                                <label htmlFor='isCorrect'>Is Correct</label>
                                                <select>
                                                    <option defaultValue value="flase">false</option>
                                                    <option value="true">true</option>
                                                </select>
                                            </div>
                                        </div>
                                    )
                                    }
                                    </>
                                    ):(null)}
                            </>
                            ) : (null) }
                            {openQuestion ? (
                                <>
                                    <div className={styles.control}>
                                            <div className={styles.answers}>
                                                <label htmlFor='answer'>Correct Answer</label>
                                                <textarea onKeyDown={handleKeyDown} type='text' required id={"answer"}/>
                                            </div>
                                        </div>
                                </>
                            ) : (null) }
                            {trueOrFalseQuestion ? (
                                <>
                                    <div className={styles.control}>
                                            <div className={styles.answers}>
                                                <label htmlFor='isCorrect'>Correct Answer</label>
                                                <select>
                                                    <option defaultValue value="flase">false</option>
                                                    <option value="true">true</option>
                                                </select>
                                            </div>
                                        </div>
                                </>
                            ) : (null) }

                            <div className={styles.actions2}>
                                <button id={styles.submit}>Create Question</button>
                            </div>
                        </form>
                        </div>
                    </Card>
                </>
            ) : (null) }

            <QuestionList questions={loadedQuestions} />
        </div>
    );
}

export default EditExamPage;