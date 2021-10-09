const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const bodyParser = require('body-parser');
// const path = require('path');

const homeRoutes =  require("./routes/homeRoutes");
const aboutRoutes =  require("./routes/aboutRoutes");
const usersRoutes = require("./routes/userRoutes");

// database
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('[SERVER] Database connected...'))
    .catch(err => console.log('Error: ' + err))

// variables
const app = express();
const port = process.env.PORT || 3000;  // eslint-disable-line
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Remote Testing App API",
            description: "API of web application for remote testing",
            contact: {
                name: "Jeremiasz Macura"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["./routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// middleware
app.use(express.urlencoded( { extended: true })); // takes all url encoded data and parse to object, which we can use in request object (req.body)
app.use(express.json()); // all data send to api will be able to access as a json
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use('/users', usersRoutes);
app.use((req, res) => {
    res.status(404).send("404 Error");
});
app.use(function (err, req, res) {
    console.log(err);
    res.status(500).send("500 Server Error");
});

if(require.main === module) {
    app.listen(port, () => console.log(`[SERVER] listening on port ${port}...`))
}


module.exports = app
