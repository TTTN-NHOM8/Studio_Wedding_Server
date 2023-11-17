const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const exampleRouter = require('./routers/example.router.js');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Router
app.use('/api', exampleRouter);









const port = 3000 || process.env.DB_PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});