PDFDocument = require('pdfkit');

const buildPDF = (data, dataCallback, endCallback) => {
    const doc = new PDFDocument();

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc
        .lineGap(6)
        .font('Times-Roman')
        .fontSize(18)
        .text('Details:', {
            align: 'center'
          })
        .fontSize(12)
        .moveDown()
        .text("title: " + data.title)
        .text("description: " + data.description)
        .text("starts at: " + data.startsAt)
        .text("ends at: " + data.endsAt)
        .text("points to get: " + data.pointsToGet)
        .text("average score: " + data.averageScore)
        .moveDown(2)
        .fontSize(18)
        .text('Questions:', {
            align: 'center'
        })
        .fontSize(12)
        .moveDown()

    data.questions.forEach((question, index) => {
        doc
            .text(`question ${index+1}: ${question.question}`)
            .text(`type: ${question.type}`)
            .text(`value: ${question.value}`)
            .moveDown()
            
    });

    doc 
        .fontSize(18)
        .moveDown()
        .text('Users Answers:', {
            align: 'center'
        })
        .fontSize(12)
        .moveDown()

    data.responses.forEach((response, index) => {
        doc
            .text(`name: ${response.name}`)
            .text(`score: ${response.score}`)
            .moveDown()
    });

    doc.end();
};
module.exports = { buildPDF };
