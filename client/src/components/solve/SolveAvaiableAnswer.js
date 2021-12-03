import styles from './SolveAvaiableAnswer.module.css';


const SolveAvaiableAnswer = (props) => {

    const count_ordinal_letter = (index) => {
        const letters = ["a) ", "b) ", "c) ", "d) ", "e) ", "f) "];
        return letters[index];
    };

    return (
        <div className={styles.valiableAnswers} >
            <label htmlFor={props.uuid}>{count_ordinal_letter(props.index)} {props.answer}</label>
            <select className={styles.selectbox} id={props.questionUuid} name={props.uuid}>
                <option defaultValue value="false">false</option>
                <option value="true">true</option>
            </select>
        </div>
    );
};

export default SolveAvaiableAnswer;
