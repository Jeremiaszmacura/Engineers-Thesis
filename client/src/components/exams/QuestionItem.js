import { Link } from 'react-router-dom';
import { useState } from 'react';

import Card from '../ui/Card';
import styles from './QuestionItem.module.css';
import AvaiableAnswerItem from './AvaiableAnswerItem';

const QuestionItem = (props) => {

    const [showAvaiableAnswers, setShowAvaiableAnswers] = useState(false);
    const [deletedItem, setDeletedItem] = useState(false);

    const deleteQuestion = (event) => {
        event.preventDefault();
        fetch(
            'http://localhost:4000/questions/' + props.uuid,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        ).then(res => {
            if (res.ok) {
                console.log('[CLIENT] delete question - fetch successful');
                setDeletedItem(true);
            } else {
                console.log('[CLIENT] delete question - fetch NOT successful');
            }
            res.json().then(data => console.log('[SERVER] delete question - ' + data));
        });
    };

    const showAvailableAnswersSwitch = () => {
        if (showAvaiableAnswers) setShowAvaiableAnswers(false);
        else setShowAvaiableAnswers(true);
    };


    return (
        <ul className={styles.list}>
            {deletedItem ? (null) : (
                <>
                    <Card>
                        <div className={styles.content}>
                            <div className={styles.element}>
                                <h3 className={styles.title}>Question: </h3>
                                <h3>{props.question}</h3>
                            </div>
                            <div className={styles.element}>
                                <p className={styles.title}>Type: </p>
                                <p>{props.type}</p>
                            </div>
                            {showAvaiableAnswers ? (
                                <>
                                {props.avaliableanswers.map((avaliableanswer) => (
                                    <AvaiableAnswerItem 
                                    key={avaliableanswer.uuid} 
                                    id={avaliableanswer.uuid}
                                    answer={avaliableanswer.answer}
                                    isCorrect={avaliableanswer.isCorrect.toString()}
                                    />
                                ))}
                                </>
                            ) : (null)}
                            
                        </div>
                        <div className={styles.actions2}>
                            <button onClick={showAvailableAnswersSwitch}>Show avaiable answers</button>
                            <Link to={`/`}><button>Edit</button></Link>
                            <button onClick={deleteQuestion}>Delete</button>
                        </div>
                    </Card>
                    
                </>
            )}
        </ul>
    );
};

export default QuestionItem;
