'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'questions',
      [
        {
          uuid: "0dbc97d7-2efc-4547-beab-07ac24c66b37",
          question: "Find the sum of 111 + 222 + 333 + 444",
          type: "singleChoice",
          value: 1,
          examId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "bf3f53ea-da3a-4ce8-890f-caaf7f3d8231",
          question: "are square and circle the same figure?",
          type: "trueOrFalse",
          value: 1,
          examId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "74f02050-5440-45a7-8e97-92cd79695150",
          question: "what is 2^4?",
          type: "open",
          value: 2,
          examId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "edc16b36-2fe3-4522-93d6-4319b81bfbb3",
          question: "by which number you can divide the number 8?",
          type: "multipleChoice",
          value: 1,
          examId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "a22a8295-13ff-44b6-8d06-847e94475d33",
          question: "what is the formula for the circumference of the circle?",
          type: "open",
          value: 2,
          examId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "d66607e2-e8c6-42f5-a8d9-f32d01947df3",
          question: "Subtract 457 from 832",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "3b3f42c6-6643-41f7-9fa2-e3fbfd643f58",
          question: "50 times 5 is equal to",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "01dcf083-9de8-49f1-bf5c-859d10266b23",
          question: "90 / 10",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "3f0c7224-f980-4dca-a9bb-e3d886826089",
          question: "Simplify: 26 + 32 - 12",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "a528362a-06ec-459b-b4a1-2f5d5c9d058f",
          question: "Find the product of 72 × 3",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "59f47f45-572a-4965-b486-3d62a0e54b0b",
          question: "Solve : 200 – (96 / 4)",
          type: "singleChoice",
          value: 1,
          examId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
  }
};
