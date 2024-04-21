const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const projectrouter = require("./routes/projectRoute");
const userrouter = require("./routes/userRouters");
const vehiclerouter = require("./routes/VehicleRoutes");
const categoryrouter = require("./routes/categoryRoute");
const inventoryrouter = require("./routes/inventoryRoute");
const leaveRouter = require("./routes/leaveRoute")
const attendanceRouter = require("./routes/attendanceRoute")
const  loanrouter = require("./routes/loanRoute");
const payslipRoute = require("./routes/payslipRoute");



const app = express();


const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userrouter);
app.use("/projects", projectrouter);
app.use("/vehicles", vehiclerouter);
app.use("/categories", categoryrouter);
app.use("/inventories", inventoryrouter);
app.use("/leaves", leaveRouter);
app.use("/attendance", attendanceRouter);
app.use("/Loan", loanrouter);
app.use("/PaySlip", payslipRoute)



//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

 

//connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
