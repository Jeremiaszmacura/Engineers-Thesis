import Card from '../ui/Card';
import styles from './SolveExamTakerId.module.css';


const SolveExamTakerId = (props) => {

    return (
        <Card>
            <div className={styles.form}>
                <div className={styles.control}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' required id='username'/>
                </div>
            </div>
        </Card>
    );
};

export default SolveExamTakerId;
