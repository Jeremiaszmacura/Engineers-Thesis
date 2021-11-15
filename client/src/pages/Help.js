import Card from '../components/ui/Card'
import styles from './Help.module.css'


const HelpPage = () => {
    return (
        <div className={styles.page}>

            <h1>Help Page</h1>

            <div className={styles.container}>
                <Card>
                    <h2 className={styles.title}>How to attempt test</h2>
                    <p className={styles.description}>
                        If you want to attempt test, You have to have test code, which
                        is 8 digit code shared by person, who created test.
                        If You have this code, then click on Home navigation button
                        and pass test code in input line. That will redirect You to page
                        in which one are presented information about test and You will
                        be asked if You want to start test.
                        While doing test You could see time which left to end of the test,
                        number of question and question number You are current in, question,
                        place to give an answer.
                    </p>
                </Card>
            </div>
            <div className={styles.container}>
                <Card>
                    <h2 className={styles.title}>How to create test</h2>
                    <p className={styles.description}>
                        At first click "Create Exam" button on the top navbar.
                        Then You will be asked to set Exam name, time to do tasks and description.
                        After that click "Submit" button. You will be redirected to "Exam Details" page.
                        In that page You are able to create tasks for Your Exam by clicking "Create Question".
                        In tasks creator You write question for this task, possible answers and select
                        right answer for this question. After filling in the form and clinking "Submit", tast will
                        be created. You can see it now in Exam details page.
                    </p>
                </Card>
            </div>
            
        </div>
    );
}

export default HelpPage;