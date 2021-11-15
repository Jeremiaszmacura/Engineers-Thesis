import { useRef } from 'react';

import styles from './Home.module.css'
import Card from '../components/ui/Card'

const HomePage = () => {

    const examCodeInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredExamCode = examCodeInputRef.current.value;

        fetch(
            'http://localhost:4000/exams/accessCode',
            {
                method: 'POST',
                body: JSON.stringify({"accessCode": enteredExamCode}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                console.log('fetch successful');
            } else {
                console.log('fetch NOT successful');
            }
            res.json().then(data => console.log(data));
        }).catch(err => {
            console.log(err);
        });

    };


    return (
        <div className="home-page">
            <h1>Start Solving Test</h1>
            <Card>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.control}>   
                        <label htmlFor='accessCode'>Pass Test's Access Code</label>
                        <input type='text' placeholder='code...' required id='accessCode' ref={examCodeInputRef} />
                    </div>
                    <div className={styles.actions}>
                        <button>Submit</button>
                    </div>
                </form>
            </Card>
        </div>
        
    );
}

export default HomePage;
