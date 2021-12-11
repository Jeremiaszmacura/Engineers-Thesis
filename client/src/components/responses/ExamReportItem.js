import CardToPDF from '../ui/CardToPDF';
import styles from './ExamReportItem.module.css';
import QuestionListForReport from './questions/QuestionListForReport';
import ResponseListForReport from './ResponseListForReport'

const ExamReportItem = (props) => {

    return (
        <div id="toPDF">
            <li className={styles.item}>
                <h3>Details</h3>
                <CardToPDF>
                    <div className={styles.content}>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Ttile: </h3>
                            <p>{props.reportData.title}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Description: </h3>
                            <p>{props.reportData.description}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>startsAt: </h3>
                            <p>{props.reportData.startsAt}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>endsAt: </h3>
                            <p>{props.reportData.endsAt}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Points To Get: </h3>
                            <p>{props.reportData.pointsToGet}</p>
                        </div>
                        <div className={styles.element}>
                            <h3 className={styles.title}>Average Score: </h3>
                            <p>{props.reportData.averageScore}</p>
                        </div>
                    </div>
                </CardToPDF>
                <QuestionListForReport questions={props.reportData.questions}/>
                <ResponseListForReport responses={props.reportData.responses}/>
            </li>
        </div>
        
    );

};

export default ExamReportItem;
