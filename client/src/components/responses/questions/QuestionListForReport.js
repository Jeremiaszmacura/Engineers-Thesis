import QuestionItemForReport from './QuestionItemForReport';
import styles from './QuestionListForReport.module.css';

const QuestionListForReport = (props) => {
    return (
        <ul className={styles.list}>
            <h3>Questions</h3>
            {props.questions.map((question, index) => (
                <QuestionItemForReport 
                key={index} 
                id={question.id}
                number={index}
                question={question.question}
                type={question.type}
                value={question.value}
                />
            ))} 
        </ul>
    );
}

export default QuestionListForReport;
