import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Home.module.css'
import Card from '../components/ui/Card'

const HomePage = () => {

    const history = useHistory();
    const examCodeInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredExamCode = examCodeInputRef.current.value;

        history.push(`/entry-solve-exam/${enteredExamCode}`);
    };


    return (
        <div className="home-page">
            <h1>Start Solving Test</h1>
            <Card>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.control}>   
                        <label htmlFor='accessCode'>Pass Test Access Code</label>
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
