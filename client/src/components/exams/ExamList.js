import ExamItem from './ExamItem';
import styles from './ExamList.module.css';

const ExamList = (props) => {
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
                pointsToGet={exam.pointsToGet}
                />
            ))} 
        </ul>
    );
}

export default ExamList;
