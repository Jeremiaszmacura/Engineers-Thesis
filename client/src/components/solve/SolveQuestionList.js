import SolveQuestionItem from './SolveQuestionItem';
import styles from './SolveQuestionList.module.css';

const SolveQuestionList = (props) => {
    return (
        <ul className={styles.list}>
            {props.questions.map((question) => (
                <SolveQuestionItem 
                key={question.id} 
                id={question.id}
                uuid={question.uuid} 
                question={question.question}
                type={question.type}
                avaliableanswers={question.avaliableanswers}
                />
            ))} 
        </ul>
    );
}

export default SolveQuestionList;
