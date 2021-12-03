'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'avaliableanswers',
      [
        {
          uuid: "541e0327-450c-4188-ba65-312278913b50",
          answer: "789",
          isCorrect: false,
          questionId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "d2106229-990f-4cba-a519-fb1a4ab47baf",
          answer: "1110",
          isCorrect: true,
          questionId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "fe5c55c8-2805-4ffc-b8c6-0e16b5c7a168",
          answer: "989",
          isCorrect: false,
          questionId: "1",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "8e4af445-c317-4894-9d0c-a83dd666c231",
          answer: "true",
          isCorrect: false,
          questionId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "c1c0388b-35c5-422a-9072-abab5f47a352",
          answer: "false",
          isCorrect: true,
          questionId: "2",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "aa0cedca-15eb-4da6-84f6-244ff5efcfe0",
          answer: "16",
          isCorrect: true,
          questionId: "3",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "42a20c7d-d3ce-467d-b97e-aeb273bad714",
          answer: "1",
          isCorrect: true,
          questionId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "af1cab42-c3d5-4518-9e68-a5511feb457c",
          answer: "2",
          isCorrect: true,
          questionId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "cad34167-9a5e-443e-9c11-f0a574376319",
          answer: "8",
          isCorrect: true,
          questionId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "50e65ef7-5026-400f-86c2-cc0537ac8572",
          answer: "0",
          isCorrect: false,
          questionId: "4",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "6af0fe73-3bc7-4600-960b-6acce669a40b",
          answer: "2*pi*r",
          isCorrect: true,
          questionId: "5",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "9de2574a-303a-4646-b808-2f5d5cd053de",
          answer: "375",
          isCorrect: true,
          questionId: "6",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "f6e39f6a-41a1-4a9f-8008-78badb148455",
          answer: "57",
          isCorrect: false,
          questionId: "6",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "643aeb2f-7238-4e75-9d8e-72d08f9837c8",
          answer: "376",
          isCorrect: false,
          questionId: "6",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "fc0eaf62-b3e2-451d-9ea8-6b3042fbaddd",
          answer: "970",
          isCorrect: false,
          questionId: "6",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "c6d13769-21ed-450b-9367-0c4581417e3e",
          answer: "2500",
          isCorrect: false,
          questionId: "7",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "ad36f0f7-8488-4607-92ea-376be3ee78eb",
          answer: "505",
          isCorrect: false,
          questionId: "7",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "7c6abe8f-8ea5-4561-8cfe-a45936b69789",
          answer: "500",
          isCorrect: false,
          questionId: "7",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "74da7640-b363-4837-a579-a91dd18eda0f",
          answer: "None of these",
          isCorrect: true,
          questionId: "7",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "7b615d54-d0ed-431f-bfde-b816fef1a40f",
          answer: "9",
          isCorrect: true,
          questionId: "8",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "f50a4a53-1c36-4fa1-b554-a0d1f1c09e9e",
          answer: "10",
          isCorrect: false,
          questionId: "8",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "78f65e94-47f7-456d-8536-b9c527082063",
          answer: "900",
          isCorrect: false,
          questionId: "8",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "36d55a94-b0e0-4838-aa37-13c8a84fbfec",
          answer: "90",
          isCorrect: false,
          questionId: "8",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "61d0018c-fe2e-47b9-b42d-44ff00ddc6cd",
          answer: "0",
          isCorrect: false,
          questionId: "9",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "9141613d-5b16-4df4-b9c6-3b21e495df00",
          answer: "32",
          isCorrect: false,
          questionId: "9",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "afd2e5ae-990c-4ad4-ad79-92041c2c8470",
          answer: "56",
          isCorrect: false,
          questionId: "9",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "50bc1f2c-01c6-4a7d-bd92-3895f6f371b1",
          answer: "46",
          isCorrect: true,
          questionId: "9",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "99c94766-646f-42d4-ac0f-c7f07158e462",
          answer: "216",
          isCorrect: true,
          questionId: "10",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "eeda36fb-38af-4ee5-91db-050cca8f7013",
          answer: "7230",
          isCorrect: false,
          questionId: "10",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "8f4dc183-66d0-4abf-9229-cad9e374f2d9",
          answer: "106",
          isCorrect: false,
          questionId: "10",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "7885208e-d4ad-4923-8ade-01270e47d689",
          answer: "372",
          isCorrect: false,
          questionId: "10",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "43149def-9f5e-4dbb-99e7-6042bcbdcbc8",
          answer: "105",
          isCorrect: false,
          questionId: "11",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "441848b9-b856-412a-9c0d-82440a939365",
          answer: "176",
          isCorrect: true,
          questionId: "11",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "3593ad94-32e8-4c0d-9180-a66ad583992a",
          answer: "26",
          isCorrect: false,
          questionId: "11",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          uuid: "764f913d-d5ae-4704-a90d-345dbdca14de",
          answer: "16",
          isCorrect: false,
          questionId: "11",
          updatedAt: new Date(),
          createdAt: new Date()
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('avaliableanswers', null, {});
  }
};
