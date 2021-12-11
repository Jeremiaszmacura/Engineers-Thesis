import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Card from '../components/ui/Card'
import styles from './EditExam.module.css'
import QuestionList from "../components/exams/QuestionList";
import CreateExamForm from "../components/exams/CreateExamForm";


const EditExamPage = () => {
    const { handle } = useParams(); // Handle params from URL
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exam
    const [loadedQuestions, setLoadedQuestions] = useState([]); // Loaded Questions
    const [addQuestion, setAddQuestion] = useState(false); // Add Question - display form
    const [editExam, setEditExam] = useState(false); // Edit Exam - display form
    const [answersToExam, setAnswersToExam] = useState(false); // Block editing exam if there are any answer to it
    const [showAnswersError, setShowAnswersError] = useState(false);

    const [singleChoiceQuestion, setSingleChoiceQuestion] = useState(true); // Set Question Type
    const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState(false); // Set Question Type
    const [openQuestion, setOpenQuestion] = useState(false); // Set Question Type
    const [trueOrFalseQuestion, setTrueOrFalsQuestion] = useState(false); // Set Question Type
    const [numberOfAvaliableAnswers, setNumberOfAvaliableAnswers] = useState(2); // Set number of avaliable answers
    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server

    const questionInputRef = useRef();
    const typeInputRef = useRef();
    const valueInputRef = useRef();
    const numberOfAvaliableAnswersInputRef = useRef();

    const history = useHistory();


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
            // if there is any response/answer, then exam cannot be edited
            if (exam.questions[0].answers[0]) setAnswersToExam(true);
            else setAnswersToExam(false);
            prepareDateTimeFormat(exam);
            setLoadedExam(exam);
            const questions = [];

            for (const key in exam.questions) {
                const question = {
                    id: key,
                    ...exam.questions[key]
                };
                question.areSoltuions = answersToExam;

                questions.push(question);
            }
            setLoadedQuestions(questions);
            setIsLoading(false);
        });
        
    }, [handle, answersToExam]);

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

    const showSolutions = (event) => {
        event.preventDefault();
        if(answersToExam) history.push(`/show-responses/${loadedExam.uuid}`);
        else setShowAnswersError("There are no responses to your test yet")
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
        const enteredValueInputRef = valueInputRef.current.value;
        const avaliableAnswers = [];
        const eventTargetLength = event.target.length

        if (enteredTypeInputRef === "open") {
            const answerItem = {
                answer: enteredQuestionInputRef,
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
                answer: event.target[4].value,
                isCorrect: event.target[5].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 7) {
            const answerItem = {
                answer: event.target[6].value,
                isCorrect: event.target[7].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 9) {
            const answerItem = {
                answer: event.target[8].value,
                isCorrect: event.target[9].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 11) {
            const answerItem = {
                answer: event.target[10].value,
                isCorrect: event.target[11].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 13) {
            const answerItem = {
                answer: event.target[12].value,
                isCorrect: event.target[13].value
            }
            avaliableAnswers.push(answerItem)
        }
        if (eventTargetLength > 15) {
            const answerItem = {
                answer: event.target[14].value,
                isCorrect: event.target[15].value
            }
            avaliableAnswers.push(answerItem)
        }

        
        const createdQuestion = {
            question: enteredQuestionInputRef,
            type: enteredTypeInputRef,
            value: enteredValueInputRef,
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

    const editExamSwitch = () => {
        if (editExam) setEditExam(false);
        else setEditExam(true);
    };

    const editExamHandler = (examData) => {
        fetch(
            'http://localhost:4000/exams/' + loadedExam.uuid,
            {
                method: 'PUT',
                body: JSON.stringify(examData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] edit exam - fetch successful');
                window.location.reload(false);
            } else {
                console.log('[CLIENT] edit exam - fetch NOT successful');
            }
            res.json().then(data => console.log(data));
        });
    }

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

            <h1>Edit Test</h1>
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
                        <p className={styles.title}>Points To Get: </p>
                        <p>{loadedExam.pointsToGet}</p>
                    </div>
                    <div className={styles.element}>
                        <p className={styles.title}>Exam Access Code: </p>
                        <p>{loadedExam.accessCode}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    {!answersToExam ? (
                        <button onClick={editExamSwitch}>Edit</button>
                    ) : (null)}
                    <button onClick={showSolutions}>Show answers</button>
                    <button onClick={deleteExam}>Delete</button>
                </div>
            </Card>
            
            <Card> 
                {showAnswersError && 
                    <div className={styles.content}>
                        <p className={styles.title}>{showAnswersError}</p>
                    </div>
                }
            </Card>

            {editExam ? (
                <>
                <CreateExamForm onCreateExam={editExamHandler} />
                </>
            ) : (null)}

            {!answersToExam ? (
                <h1>Manage Questions</h1>
            ) : (
                <h1>Questions</h1>
            )}
            

            {!answersToExam ? (
                <>
                    <div className={styles.manage}>
                        <button onClick={addingQuestionSwitch}>Add Question</button>
                    </div>
                </>
            ) : (null)}
            

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
                                <label htmlFor='pointsToGet'>value - points to get </label>
                                <select ref={valueInputRef}>
                                    <option defaultValue value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className={styles.control}>
                                <label htmlFor='typeOfQuestion'>type</label>
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
                                                        <option defaultValue value="false">false</option>
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
                                                    <option defaultValue value="false">false</option>
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
                                                    <option defaultValue value="false">false</option>
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