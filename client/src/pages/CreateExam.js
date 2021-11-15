import { useHistory } from 'react-router-dom';

import CreateExamForm from "../components/exams/CreateExamForm";

const CreateExamPage = () => {
    const history = useHistory();

    const createExamHandler = (examData) => {
        fetch(
            'http://localhost:4000/exams/create',
            {
                method: 'POST',
                body: JSON.stringify(examData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        ).then(() => {
            history.replace('/');
        });
    }

    return (
        <section>
            <h1>Create Exam Page</h1>
            <CreateExamForm onCreateExam={createExamHandler} />
        </section>
    );
}

export default CreateExamPage;
