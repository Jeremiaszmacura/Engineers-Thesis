import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ExamReportItem from './ExamReportItem';
// import styles from './ShowExamResponses.module.css'


const GeneralReport = () => {

    const { handle } = useParams(); // Handle params from URL

    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server
    const [reportData, setReportData] = useState(null); // hold data from server


    useEffect(() => {
        // fetch exam from severs
        setIsLoading(true);
        fetch(
            `http://localhost:4000/exams/general-report/${handle}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            setReportData(data)
            setIsLoading(false);
        });
        
    }, [handle]);


    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    return (
        <div>
            <ExamReportItem reportData={reportData}/>
        </div>  
    );
}

export default GeneralReport;
