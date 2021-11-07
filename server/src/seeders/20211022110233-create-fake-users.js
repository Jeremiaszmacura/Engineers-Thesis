'use strict';

module.exports = {
  
  // password not hashed: 123456
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: '1428b04e-abff-4dd5-b7f1-90608e15112a',
          name: 'John Doe',
          email: 'john@email.com',
          password: '$2b$10$PaDjZHvX4B3DdpV2Kb3/B.XtLhJobiDHn3EhwU1liuI0WW66LNSs.',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          uuid: '9be029f5-3a17-45a7-a0bb-5ae9f2c3da97',
          name: 'Janet Diego',
          email: 'janet@email.com',
          password: '$2b$10$PaDjZHvX4B3DdpV2Kb3/B.XtLhJobiDHn3EhwU1liuI0WW66LNSs.',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          uuid: '68da2eae-4335-4e5a-9f09-c5a301147336',
          name: 'Juliet Sandiego',
          email: 'juliet@email.com',
          password: '$2b$10$PaDjZHvX4B3DdpV2Kb3/B.XtLhJobiDHn3EhwU1liuI0WW66LNSs.',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          uuid: 'd0d96d16-0d19-49b1-988d-a65ff09ea867',
          name: 'Tom Baboc',
          email: 'tom@email.com',
          password: '$2b$10$PaDjZHvX4B3DdpV2Kb3/B.XtLhJobiDHn3EhwU1liuI0WW66LNSs.',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          uuid: 'ac78f275-345b-4168-b61e-7b684e499604',
          name: 'Bob Kekw',
          email: 'bob@email.com',
          password: '$2b$10$PaDjZHvX4B3DdpV2Kb3/B.XtLhJobiDHn3EhwU1liuI0WW66LNSs.',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
