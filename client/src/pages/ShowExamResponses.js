import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import ExamItem from '../components/exams/ExamItem';
import ResponseList from "../components/responses/ResponseList";
import GeneralReport from "../components/responses/GeneralReport"
import styles from './ShowExamResponses.module.css'


const HomePage = () => {

    const { handle } = useParams(); // Handle params from URL

    const [isLoading, setIsLoading] = useState(true); // Waiting to fetch data form server
    const [generalReport, setGeneralReport] = useState(false); // show general report component
    const [loadedExam, setLoadedExam] = useState(null); // Loaded Exam

    useEffect(() => {
        // fetch exam from severs
        setIsLoading(true);
        fetch(
            `http://localhost:4000/exams/show-responses/${handle}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            setLoadedExam(data)
            setIsLoading(false);
        });
        
    }, [handle]);

    const generalReportSwitch = () => {
        if (generalReport) setGeneralReport(false);
        else setGeneralReport(true);
    };

    const showReportInPDF = () => {
        const input = document.getElementById("toPDF");
        const width = input.style.width;
        input.style.width = '200mm';

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 200; 
                const pageHeight = 295;  
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                const doc = new jsPDF('p', 'mm');
                let position = 0;

                doc.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                }
                doc.save(`${loadedExam.exam.title}-report.pdf`);
            });

            input.style.width = width;
    };

    const downloadReportInPDF = (event) => {
        event.preventDefault();
        window.open(`http://localhost:4000/exams/general-report-pdf/${handle}`);
    };


    if(isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    };

    if(generalReport) {
        return (
            <section>
                <div className={styles.content}>
                    <button onClick={generalReportSwitch}>Exit general report</button>
                    <button onClick={showReportInPDF}>Download report .pdf</button>
                    <GeneralReport />
                </div>
            </section>
        )
    }

    return (
        <div>
            <div>
                <ExamItem 
                    key={loadedExam.exam.id} 
                    uuid={loadedExam.exam.uuid} 
                    title={loadedExam.exam.title}
                    startsAt={loadedExam.exam.startsAt}
                    endsAt={loadedExam.exam.endsAt}
                    description={loadedExam.exam.description} 
                    accessCode={loadedExam.exam.accessCode}
                    pointsToGet={loadedExam.exam.pointsToGet}
                    />
            </div>

            <div className={styles.content}>
                <button onClick={generalReportSwitch}>Show general report</button>
                <button onClick={downloadReportInPDF}>Download report .pdf</button>
            </div>

            <div>
                <ResponseList responses={loadedExam.responses} />
            </div>
        </div>
        
        
    );
}

export default HomePage;
