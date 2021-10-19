const { User, Exam } = require("../models");


const convertDateFormatHtmlToDb = (date) => {
    // Converts HTML datetime-local format to PostgreSQL timestamp format
    return date.replace("T", " ") + ":00";
};


const allExamsGet = async (req, res) => {
    try {
        const exam = await Exam.findAll();
        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


const examCreatePost = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.body.userUuid } });

        const exam = await Exam.create({ 
            title: req.body.title,
            startsAt: convertDateFormatHtmlToDb(req.body.startsAt),
            endsAt: convertDateFormatHtmlToDb(req.body.endsAt),
            description: req.body.description,
            accessCode: (Math.random() + 1).toString(36).substring(4),
            userId: user.id 
        });

        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


const ExamGet = async (req, res) => {
    try {
        const exam = await Exam.findOne({ where: { uuid: req.params.uuid } });
        return res.json(exam);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


module.exports = {
    allExamsGet,
    examCreatePost,
    ExamGet
};
