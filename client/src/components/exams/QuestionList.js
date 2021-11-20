import QuestionItem from './QuestionItem';
import styles from './QuestionList.module.css';

const QuestionList = (props) => {
    return (
        <ul className={styles.list}>
            {props.exams.map((exam) => (
                <ExamItem 
                key={exam.id} 
                id={exam.id}
                uuid={exam.uuid} 
                title={exam.title}
                startsAt={exam.startsAt}
                endsAt={exam.endsAt}
                description={exam.description} 
                accessCode={exam.accessCode}
                />
            ))} 
        </ul>
    );
}

export default QuestionList;
