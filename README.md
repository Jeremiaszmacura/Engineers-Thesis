<!-- Heading -->
# Web application for remote knowledge testing

## General informations:
<!-- UL-->
* ### Backend: Node.js with Express.js
* ### Frontend: React.js
* ### Database: PostreSQL (ORM - Sequelize)
* ### Authentication and authorization: Passport.js
* ### Server API (Swagger URL): /api-docs/#/

<hr>

## Setting up development environment:

### Requirements
<!-- UL-->
* GIT
* Docker Desktop

### 1\. Clone repository:
<!-- UL-->
* go into destinarion directory
* open git terminal in current directory
* type: git clone 

### 2\. TODO

### 3\. Setup database:
<!-- UL-->
* go to directory: server/src/
* create database - type in terminal: sequelize db:create
* migrate database - type in terminal: sequelize db:migrate
* enter test data into the database - type in terminal: sequelize db:seed:all

### Manage database:
<!-- UL-->
* remove test data from the database - type in terminal: sequelize db:seed:undo:all
* undo all migrations - type in terminal: sequelize db:migrate:undo:all
* drop database - type in terminal: sequelize db:drop