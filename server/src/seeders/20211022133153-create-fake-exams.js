'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'exams',
      [
        {
          uuid: "02f292ea-52a8-4e5c-a10e-06418e825e21",
          title: "Math test - 2a",
          startsAt: "2021-10-22T12:00:00.000Z",
          endsAt: "2022-10-22T12:00:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsbdyeee",
          pointsToGet: "6",
          showScore: false,
          userId: "5",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "7f99b7a2-3530-40eb-9401-baa4d54337b4",
          title: "Math quiz - 4c",
          startsAt: "2021-10-22T12:00:00.000Z",
          endsAt: "2022-10-22T12:00:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "ltnudpay",
          pointsToGet: "7",
          showScore: true,
          userId: "5",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "ce148def-b997-4d8c-ab05-30f41a2665c6",
          title: "Math Test - 2a",
          startsAt: "2021-10-18T12:30:00.000Z",
          endsAt: "2021-10-18T12:50:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsfasdfs",
          pointsToGet: "0",
          showScore: true,
          userId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "bdc92a29-c016-4ea1-b27c-e75ab875120a",
          title: "Linux Quiz",
          startsAt: "2021-10-18T12:30:00.000Z",
          endsAt: "2021-10-18T12:50:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsbdybbb",
          pointsToGet: "0",
          showScore: true,
          userId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "0e1e6edc-2466-45ef-b98d-32a2a6f03796",
          title: "Math Egzam - 3rd year",
          startsAt: "2021-10-18T12:30:00.000Z",
          endsAt: "2021-10-18T12:50:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsbdyccc",
          pointsToGet: "0",
          showScore: true,
          userId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "8eff096a-b615-48d8-9a49-140bf699f42d",
          title: "Biology Test - 3b",
          startsAt: "2021-10-18T12:30:00.000Z",
          endsAt: "2021-10-18T12:50:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsbdyddd",
          pointsToGet: "0",
          showScore: false,
          userId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "76d21b29-e71c-4913-86b0-3586f8de8727",
          title: "Physics test - 1st year",
          startsAt: "2021-10-18T12:30:00.000Z",
          endsAt: "2021-10-18T12:50:00.000Z",
          description: "Time limit for this test is 30min, good luck :)",
          accessCode: "fsbdyeee",
          pointsToGet: "0",
          showScore: true,
          userId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exams', null, {});
  }
};
