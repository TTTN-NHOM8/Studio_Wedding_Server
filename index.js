const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const exampleRouter = require('./routers/example.router.js');
const accountRouters = require('./routers/account.routers.js');
const routeContract=require('./routers/contract.router.js');
const contractDetailRouter = require('./routers/contract-detail.router.js');
const taskRouter = require('./routers/task.router.js');
const serviceRouter = require('./routers/service.router.js');
const routeProduct=require('./routers/router-product.js'); 
const employeeRouter =require('./routers/EmployeeRouter.js');
const customerRouter=require('./routers/customer-router.js')


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Hiển thị thông tin HTTP khi yêu cầu
app.use((req, res, next) => {
    console.log("🚀 ~ file: index.js:59 ~ app.use ~ req:", req.method + req.url);
    next();
});

// Router
app.use('/api', exampleRouter);
app.use('/api', accountRouters)
app.use('/api',routeContract);
app.use('/api', contractDetailRouter);
app.use('/api', routeProduct);
app.use('/api', taskRouter);
app.use('/api', serviceRouter);
app.use('/api', employeeRouter);
app.use('/api', customerRouter);





const port = 3000 || process.env.DB_PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});