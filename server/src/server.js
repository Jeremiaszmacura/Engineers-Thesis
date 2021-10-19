const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const path = require('path');

const usersRoutes = require("./routes/usersRoutes");
const examsRoutes = require("./routes/examsRoutes");

// database DROP DATABASE database_development_test WITH (FORCE);
const { sequelize } = require("./models");

// variables
const app = express();
const port = process.env.PORT || 4000;  // eslint-disable-line
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "MaKnowledge",
            description: "API of web application for remote knowlegde testing",
            contact: {
                name: "Jeremiasz Macura"
            },
            servers: ["http://localhost:4000"]
        }
    },
    apis: ["./src/routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);


// middleware
app.use(express.urlencoded( { extended: false })); // takes all url encoded data and parse to object, which we can use in request object (req.body)
app.use(express.json()); // all data send to api will be able to access as a json
app.use((req, res, next) => { // CORS enabled
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/users", usersRoutes);
app.use("/exams", examsRoutes);
app.use((req, res) => {
    res.status(404).send("404 Error");
});
app.use(function (err, req, res) {
    console.log(err);
    res.status(500).send("500 Server Error");
});


if(require.main === module) {
    sequelize.authenticate()
        .then(() => {
            app.listen(port, () => console.log(`[SERVER] listening on http://localhost:${port}`))
        })
        .catch((err) => console.log(err));
}


module.exports = app
