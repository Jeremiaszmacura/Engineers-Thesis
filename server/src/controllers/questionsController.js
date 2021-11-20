const { User, Exam, Question, ValiableAnswer } = require("../models");


const createQuestionPost = async (req, res) => {
    try {
        const user = await User.findOne({ where: { uuid: req.user.uuid } });

        const exam = await Exam.findOne({ where: { uuid: req.params.uuid } })

        const question = await Question.create({ 
            question: req.body.question,
            type: req.body.type,
            examId: exam.id
        });

        req.body.valiableAnswers.forEach(async valiableAnswer => {
            const isCorrect = (valiableAnswer.isCorrect === "true");
            await  ValiableAnswer.create({
                answer: valiableAnswer.answer,
                isCorrect: isCorrect,
                questionId: question.id
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    };

    res.status(200).json("[SERVER] question created");
};


module.exports = {
    createQuestionPost
};
