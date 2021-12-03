/* eslint-disable curly */
const { User, Exam, Question, AvaliableAnswer, Response, Answer } = require("../models");


const convertDateFormatHtmlToDb = (date) => {
    // Converts HTML datetime-local format to PostgreSQL timestamp format
    return date.replace("T", " ") + ":00";
};


const generateRundomString = () => {
    return (Math.random() + 1).toString(36).substring(4);
};


const allExamsGet = async (req, res) => {
    try {
        const exams = await Exam.findAll({ include: "user" });
        return res.json(exams);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const myExamsGet = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.user.uuid } });
        const exams = await Exam.findAll({ where: { userId: user.id } });
        return res.json(exams);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const examCreatePost = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.user.uuid } });

        const exam = await Exam.create({ 
            title: req.body.title,
            startsAt: convertDateFormatHtmlToDb(req.body.startsAt),
            endsAt: convertDateFormatHtmlToDb(req.body.endsAt),
            description: req.body.description,
            accessCode: generateRundomString(),
            userId: user.id 
        });

        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const examGet = async (req, res) => {
    try {
        const exam = await Exam.findOne({ 
            where: { uuid: req.params.uuid },
            include:  { all: true, nested: true }
        });
        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const examDelete = async (req, res) => {
    try {
        const exam = await Exam.findOne({ where: { uuid: req.params.uuid } });
        await exam.destroy();
        return res.json({ message: "Exam deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const examUpdate = async (req, res) => {
    try {
        const { title, startsAt, endsAt, description } = req.body
        const exam = await Exam.findOne({ where: { uuid: req.params.uuid } });
        if (title) { exam.title = title; };
        if (startsAt) { exam.startsAt = startsAt; };
        if (endsAt) { exam.endsAt = endsAt; };
        if (description) { exam.description = description; };
        await exam.save();
        return res.status(200).json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const examByAccessCodeGet = async (req, res) => {
    try {
        sendAccessCode = req.body.accessCode.replace(/\s/g, "");
        const exam = await Exam.findOne({ 
            where: { accessCode: sendAccessCode }
        });
        if(!exam) return res.json("Not found any test with access code like: " + sendAccessCode);
        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const solveExamGet = async (req, res) => {
    try {
        const exam = await Exam.findOne({ 
            where: { uuid: req.params.uuid },
            include: { 
                model: Question, 
                as: "questions",
                include: { 
                    model: AvaliableAnswer, 
                    as: "avaliableanswers", 
                    attributes: ["answer", "uuid"] 
                } 
            }
        });
    
        await exam.questions.forEach(question => {
            if (question["type"] === "open") delete question.avaliableanswers;
        });
    
        currentDate = new Date()
        currentDate.setTime( currentDate.getTime() - new Date().getTimezoneOffset()*60*1000 ); 
    
        const valid = exam.startsAt < currentDate && exam.endsAt > currentDate
        if (valid) res.json(exam);
        else res.json("Exam is not available now. Check \"Starts at\" and \"Ends at\" date");  
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
    
};


const examAvailabilityGet = async (req, res) => {
    try {
        const exam = await Exam.findOne({ 
            where: { uuid: req.params.uuid }
        });
        currentDate = new Date()
        currentDate.setTime( currentDate.getTime() - new Date().getTimezoneOffset()*60*1000 ); 

        const valid = exam.startsAt < currentDate && exam.endsAt > currentDate
        if (valid) res.json("Exam avaiable");
        else res.json("Exam is not available now. Check \"Starts at\" and \"Ends at\" date")
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
};


const solveExamPost = async (req, res) => {
    const testTakerName = req.body.name;
    const answers = req.body.answers;
    let answerToSave = "";
    let avaiableAnswersContentToSave = "";
    let avaiableAnswersCorrectnessToSave = "";
    let answerObjectToSave = [];
    let listOfAvaliableAnswers = [];
    let score = 0;
    let isAnswerCorrect = true;

    try {
        const exam = await Exam.findOne({ 
            where: { uuid: req.params.uuid },
            include:  { all: true, nested: true }
        });

        exam.questions.forEach(question => {
            question.avaliableanswers.forEach(avaliableanswer => {
                const avaiableAnswerUuid = avaliableanswer.uuid
                const avaiableAnswerAnswer = avaliableanswer.answer
                const avaiableAnswerIsCorrect = avaliableanswer.isCorrect
                const avaiableAnswerQuestionId = avaliableanswer.questionId
                const questionType = question.type
                const questionValue = question.value
                const avaiableAnswer = { avaiableAnswerAnswer, avaiableAnswerIsCorrect, avaiableAnswerQuestionId, questionType, questionValue }
                listOfAvaliableAnswers[avaiableAnswerUuid] = avaiableAnswer;
            });
        });
    
        const response = await Response.create({ 
            name: testTakerName,
            examId: exam.id
        }); 
    
        for (let i = 0; i < answers.length; i++) {
            // if it IS NOT LAST answer/avaiableAnswer of this question
            if (answers[i+1] && answers[i].questionUuid === answers[i+1].questionUuid) {
                answerToSave = answerToSave + String(answers[i].answer) + "$$";
                avaiableAnswersContentToSave = avaiableAnswersContentToSave + String(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerAnswer) + "$$";
                avaiableAnswersCorrectnessToSave = avaiableAnswersCorrectnessToSave + String(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerIsCorrect) + "$$";
                // If earlier answer were correct and this one IS NOT correct
                if(String(isAnswerCorrect && listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerIsCorrect) !== String(answers[i].answer)) {
                    isAnswerCorrect = false;
                }

            // if it IS LAST answer/avaiableAnswer of this question
            } else {
                // If question type == open
                if (listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].questionType === "open") {
                    if(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerAnswer === String(answers[i].answer)) {
                        score += listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].questionValue;
                    }
                } else {
                    // If earlier answer were correct and this one is correct
                    if(isAnswerCorrect && String(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerIsCorrect) === String(answers[i].answer)) {
                        score += listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].questionValue;
                    }
                }

                answerToSave = answerToSave + String(answers[i].answer) + "$$";
                avaiableAnswersContentToSave = avaiableAnswersContentToSave + String(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerAnswer) + "$$";
                avaiableAnswersCorrectnessToSave = avaiableAnswersCorrectnessToSave + String(listOfAvaliableAnswers[answers[i].avaiableAnswerUuid].avaiableAnswerIsCorrect) + "$$";
                answerObjectToSave.push(
                    {
                        "questionUuid": answers[i].questionUuid, 
                        "avaiableAnswerUuid": answers[i].avaiableAnswerUuid,
                        "avaiableAnswersContent": avaiableAnswersContentToSave,
                        "avaiableAnswersCorrectness": avaiableAnswersCorrectnessToSave,
                        "answer": answerToSave
                    }
                )
                answerToSave = "";
                avaiableAnswersContentToSave = "";
                avaiableAnswersCorrectnessToSave = "";

                isAnswerCorrect = true;
            }
        }
    
        answerObjectToSave.forEach(async (answer) => {
            const question = await Question.findOne({ where: { uuid: answer.questionUuid } });
            const answerDbObject = Answer.create({
                answer: answer.answer,
                questionContent: question.question,
                questionType: question.type,
                avaiableAnswersContent: answer.avaiableAnswersContent,
                avaiableAnswersCorrectness: answer.avaiableAnswersCorrectness,
                responseId: response.id,
                questionId: question.id
            });
        });

        response.score = score;
        await response.save();

        if (exam.showScore)  res.json({
            "message": "Test solution has been successfully submitted",
            "score": score
        }); else res.json( { "message": "Test solution has been successfully submitted" } );
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    };
    
};


module.exports = {
    allExamsGet,
    myExamsGet,
    examCreatePost,
    examGet,
    examDelete,
    examUpdate, 
    examByAccessCodeGet,
    solveExamGet,
    examAvailabilityGet,
    solveExamPost
};
