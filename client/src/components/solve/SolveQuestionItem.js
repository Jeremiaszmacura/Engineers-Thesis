import Card from '../ui/Card';
import styles from './SolveQuestionItem.module.css';
import SolveAvaiableAnswer from './SolveAvaiableAnswer';


const SolveQuestionItem = (props) => {

    const handleKeyDown = (e) => {
        // Adjust size of textarea
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
      };

    return (
        <ul className={styles.list}>
            <Card>
                <div className={styles.content}>
                    <div className={styles.element}>
                        <h3 className={styles.title}>Question {Number(props.id) + 1}:</h3>
                        <h3>{props.question}</h3>
                    </div>
                    {(props.type === "singleChoice") ? (
                        <ul className={styles.list}>
                            <p className={styles.title}>choose correct answer</p>
                            {props.avaliableanswers.map((avaliableanswer, index) => (
                                <SolveAvaiableAnswer 
                                key={avaliableanswer.uuid} 
                                id={avaliableanswer.id}
                                index={index}
                                uuid={avaliableanswer.uuid} 
                                questionUuid={props.uuid}
                                answer={avaliableanswer.answer}
                                />
                            ))}
                        </ul>
                    ) : (null)}

                    {(props.type === "multipleChoice") ? (
                        <ul className={styles.list}>
                            <p className={styles.title}>choose correct answer</p>
                            {props.avaliableanswers.map((avaliableanswer, index) => (
                                <SolveAvaiableAnswer 
                                key={avaliableanswer.uuid} 
                                id={avaliableanswer.id}
                                index={index}
                                uuid={avaliableanswer.uuid} 
                                questionUuid={props.uuid}
                                answer={avaliableanswer.answer}
                                />
                            ))}
                        </ul>
                    ) : (null)}
                    
                    {(props.type === "open") ? (
                        <>
                        <div className={styles.control}>
                            <label htmlFor={props.uuid}>Answer: </label>
                            <textarea onKeyDown={handleKeyDown} type='text' required id={props.uuid} name={props.avaliableanswers[0].uuid}/>
                        </div>
                        </>
                    ) : (null)}
                    {(props.type === "trueOrFalse") ? (
                        <>
                        <div className={styles.control}>
                        <label htmlFor={props.uuid}>Answer: </label>
                            <select id={props.uuid} name={props.avaliableanswers[0].uuid}>
                                <option defaultValue value="flase">false</option>
                                <option value="true">true</option>
                            </select>
                        </div>
                        </>
                    ) : (null)}
                </div>     
            </Card>
        </ul>
    );
};

export default SolveQuestionItem;
