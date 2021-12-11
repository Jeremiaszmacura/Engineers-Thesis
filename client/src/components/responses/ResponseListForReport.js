import ResponseItemForReport from './ResponseItemForReport';
import styles from './ResponseListForReport.module.css';

const ResponseListForReport = (props) => {
    return (
        <ul className={styles.list}>
            <h3>Users Answers</h3>
            {props.responses.map((response, index) => (
                <ResponseItemForReport 
                key={index} 
                id={response.id}
                uuid={response.uuid} 
                name={response.name}
                score={response.score}
                />
            ))} 
        </ul>
    );
}

export default ResponseListForReport;
