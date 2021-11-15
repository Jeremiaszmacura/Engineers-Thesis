// IMPORT AND CONFIGURE ENV VARIABLES
require("dotenv").config({path: "../.env"});

// IMPORT EXTERNAL LIBRARIES
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const passport = require("passport");
passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

// IMPORT INTERNAL LIBRARIES
const usersRoutes = require("./routes/usersRoutes");
const examsRoutes = require("./routes/examsRoutes");
// database DROP DATABASE database_development_test WITH (FORCE);
const { sequelize } = require("./models");


// VARIABLES
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


// MIDDLEWARE
app.use(express.urlencoded( { extended: false })); // takes all url encoded data and parse to object, which we can use in request object (req.body)
app.use(express.json()); // all data send to api will be able to access as a json
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false }
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passportConfig")(passport);
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


// CONNECT TO DATABASE AND RUN SERVER
if(require.main === module) {
    sequelize.authenticate()
        .then(() => {
            app.listen(port, () => console.log(`[SERVER] listening on http://localhost:${port}`))
        })
        .catch((err) => console.log(err));
}


module.exports = app
