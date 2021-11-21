const { User, Exam } = require("../models");


const convertDateFormatHtmlToDb = (date) => {
    // Converts HTML datetime-local format to PostgreSQL timestamp format
    return date.replace("T", " ") + ":00";
};


const generateRundomString = () => {
    return (Math.random() + 1).toString(36).substring(4);
};


const allExamsGet = async (req, res) => {
    try {
        const exams = await Exam.findAll({ include: 'user' });
        return res.json(exams);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


const myExamsGet = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.user.uuid } });
        const exams = await Exam.findAll({ where: { userId: user.id } });
        return res.json(exams);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
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
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


const ExamGet = async (req, res) => {
    try {
        const exam = await Exam.findOne({ 
            where: { uuid: req.params.uuid },
            include:  { all: true, nested: true }
        });
        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


const ExamDelete = async (req, res) => {
    try {
        const exam = await Exam.findOne({ where: { uuid: req.params.uuid } });
        await exam.destroy();
        return res.json({ message: 'Exam deleted.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


const ExamUpdate = async (req, res) => {
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
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


const ExamAndQuestionsByAccessCodeGet = async (req, res) => {
    try {
        const examAndQuestions = await Exam.findOne({ 
            where: { accessCode: req.body.accessCode }, 
            include: 'questions' 
        });
        return res.json(examAndQuestions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    };
};


module.exports = {
    allExamsGet,
    myExamsGet,
    examCreatePost,
    ExamGet,
    ExamDelete,
    ExamUpdate, 
    ExamAndQuestionsByAccessCodeGet
};
