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

<!-- UL-->
### 1\. Clone repository:
* go into destinarion directory
* open git terminal in current directory
* type: git clone 

### 2\. TODO

### 3\. Setup database:
* go to directory: server/src/
* create database - type in terminal: sequelize db:create
* migrate database - type in terminal: sequelize db:migrate
* enter test data into the database - type in terminal: sequelize db:seed:all

#### If you want to remove test data from the database - type in terminal: sequelize db:seed:undo:all
#### If you want to undo all migrations - type in terminal: sequelize db:migrate:undo:all
#### If you want to drop database - type in terminal: sequelize db:drop