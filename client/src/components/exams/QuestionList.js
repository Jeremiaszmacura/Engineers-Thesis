import QuestionItem from './QuestionItem';
import styles from './QuestionList.module.css';

const QuestionList = (props) => {
    return (
        <ul className={styles.list}>
            {props.questions.map((question) => (
                <QuestionItem 
                key={question.id} 
                id={question.id}
                uuid={question.uuid} 
                question={question.question}
                type={question.type}
                value={question.value}
                avaliableanswers={question.avaliableanswers}
                aresoltuions={question.areSoltuions}
                />
            ))} 
        </ul>
    );
}

export default QuestionList;
