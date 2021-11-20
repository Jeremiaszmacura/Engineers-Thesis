import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Card from '../components/ui/Card'
import styles from './EditExam.module.css'


const EditExamPage = () => {
    const { handle } = useParams(); // Handle params from URL
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exams
    // const [loadedQuestions, setLoadedQuestions] = useState([]); // Loaded Questions
    const [addQuestion, setAddQuestion] = useState(false); // Add Question - display form
    const [singleChoiceQuestion, setSingleChoiceQuestion] = useState(true); // Set Question Type
    const [multiChoiceQuestion, setMultiChoiceQuestion] = useState(false); // Set Question Type
    const [openQuestion, setOpenQuestion] = useState(false); // Set Question Type
    const [trueOrFalseQuestion, setTrueOrFalsQuestion] = useState(false); // Set Question Type
    const [numberOfValiableAnswers, setNumberOfValiableAnswers] = useState(2); // Set number of valiable answers
    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server

    const questionInputRef = useRef();
    const typeInputRef = useRef();
    const numberOfValiableAnswersInputRef = useRef();


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
            console.log(exam);
            setLoadedExam(exam);
            const questions = [];

            for (const key in exam.questions) {
                const question = {
                    id: key,
                    ...exam.questions[key]
                };

                questions.push(question);
                console.log("question:");
                console.log(question);
            }
            console.log("questions list:");
            console.log(questions);
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
                console.log('fetch successful');
                window.location.reload(false);
            } else {
                console.log('fetch NOT successful');
            }
            res.json().then(data => console.log(data));
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
        const valiableAnswers = [];
        const eventTargetLength = event.target.length

        if (enteredTypeInputRef === "open") {
            const answerItem = {
                answer: event.target[2].value,
                isCorrect: "true"
            }
            valiableAnswers.push(answerItem)
        }
        if (enteredTypeInputRef === "trueOrFalse") {
            const answerItem = {
                answer: enteredQuestionInputRef,
                isCorrect: event.target[2].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 5) {
            const answerItem = {
                answer: event.target[3].value,
                isCorrect: event.target[4].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 6) {
            const answerItem = {
                answer: event.target[5].value,
                isCorrect: event.target[6].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 8) {
            const answerItem = {
                answer: event.target[7].value,
                isCorrect: event.target[8].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 10) {
            const answerItem = {
                answer: event.target[9].value,
                isCorrect: event.target[10].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 12) {
            const answerItem = {
                answer: event.target[11].value,
                isCorrect: event.target[12].value
            }
            valiableAnswers.push(answerItem)
        }
        if (eventTargetLength > 14) {
            const answerItem = {
                answer: event.target[13].value,
                isCorrect: event.target[14].value
            }
            valiableAnswers.push(answerItem)
        }

        
        const createdQuestion = {
            question: enteredQuestionInputRef,
            type: enteredTypeInputRef,
            valiableAnswers: valiableAnswers
        };

        console.log(createdQuestion);
        console.log("send to server - adding question");
        // window.location.reload(false);

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
                console.log('fetch successful');
            } else {
                console.log('fetch NOT successful');
            }
            res.json().then(data => console.log(data));
        });

    };

    const changeQuestionType = (event) => {
        // question type to display the appropriate form
        const enteredTypeInputRef = typeInputRef.current.value;
        setNumberOfValiableAnswers(2);
        setSingleChoiceQuestion(false);
        setMultiChoiceQuestion(false);
        setOpenQuestion(false);
        setTrueOrFalsQuestion(false);
        if (enteredTypeInputRef === "singleChoice") setSingleChoiceQuestion(true);
        else if (enteredTypeInputRef === "multiChoice") setMultiChoiceQuestion(true);
        else if (enteredTypeInputRef === "open") setOpenQuestion(true);
        else if (enteredTypeInputRef === "trueOrFalse") setTrueOrFalsQuestion(true);
    };

    const changeNumberOfAvaibleAnswers = (event) => {
        setNumberOfValiableAnswers(Number(numberOfValiableAnswersInputRef.current.value));
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
                <button onClick={setAddQuestion}>Add Question</button>
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
                                    <option value="multiChoice">Multi Choice</option>
                                    <option value="open">Open</option>
                                    <option value="trueOrFalse">True/False</option>
                                </select>
                            </div>
                            
                            {singleChoiceQuestion ? (
                                <>  
                                    <div className={styles.control}>
                                        <label htmlFor='newPassword'>Number of valiable answers</label>
                                        <select ref={numberOfValiableAnswersInputRef} onChange={changeNumberOfAvaibleAnswers}>
                                            <option defaultValue value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    {numberOfValiableAnswers ? (
                                        <>
                                        {
                                            [...Array(numberOfValiableAnswers)].map((e, i) => 
                                            <div className={styles.control} key={i}>
                                                <div className={styles.answers}>
                                                    <label htmlFor='answer'>Valiable Answer</label>
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
                            {multiChoiceQuestion ? (
                                <>  
                                <div className={styles.control}>
                                    <label htmlFor='newPassword'>Number of valiable answers</label>
                                    <select ref={numberOfValiableAnswersInputRef} onChange={changeNumberOfAvaibleAnswers}>
                                        <option defaultValue value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                {numberOfValiableAnswers ? (
                                    <>
                                    {
                                        [...Array(numberOfValiableAnswers)].map((e, i) => 
                                        <div className={styles.control} key={i}>
                                            <div className={styles.answers}>
                                                <label htmlFor='answer'>Valiable Answer</label>
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
                                <button id={styles.submit}>Submit</button>
                            </div>
                        </form>
                        </div>
                    </Card>
                </>
            ) : (null) }

            <Card>
                <p>questions...</p>
            </Card>
        </div>
    );
}

export default EditExamPage;