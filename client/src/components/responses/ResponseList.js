import ResponseItem from './ResponseItem';
import styles from './ResponseList.module.css';

const ResponseList = (props) => {
    return (
        <ul className={styles.list}>
            {props.responses.map((response) => (
                <ResponseItem 
                key={response.uuid} 
                id={response.id}
                uuid={response.uuid} 
                name={response.name}
                score={response.score}
                />
            ))} 
        </ul>
    );
}

export default ResponseList;
