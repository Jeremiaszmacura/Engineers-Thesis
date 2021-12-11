import { useRef } from 'react';

import styles from './CreateExamForm.module.css';
import Card from '../ui/Card';

const CreateExamForm = (props) => {
    const titleInputRef = useRef();
    const startsAtInputRef = useRef();
    const endsAtInputRef = useRef();
    const DescriptionInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredStartsAt = startsAtInputRef.current.value;
        const enteredEndsAt = endsAtInputRef.current.value;
        const enteredDescription = DescriptionInputRef.current.value;

        const examData = {
            title: enteredTitle,
            startsAt: enteredStartsAt,
            endsAt: enteredEndsAt,
            description: enteredDescription
        };

        props.onCreateExam(examData);
    }

    return (
        <Card>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor='title'>Test Title</label>
                    <input type='text' required id='title' ref={titleInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='time'>Starts At</label>
                    <input type='datetime-local' required id='time' ref={startsAtInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='time'>Ends At</label>
                    <input type='datetime-local' required id='time' ref={endsAtInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' required rows='5' ref={DescriptionInputRef} />
                </div>
                <div className={styles.actions}>
                    <button>Create Test</button>
                </div>
            </form>
        </Card>
    );
}

export default CreateExamForm;
