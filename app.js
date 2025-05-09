const express = require("express");
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const connectToDB = require("./config/db");
connectToDB();

const app = express();
const indexRouter = require("./routes/index.routes.js");
const uploadRouter = require("./routes/upload.routes");

app.set("view engine", "ejs"); //To share Static files in routes

app.use(cookieParser()); //calling this middleware to get resonse
//adding middleware to get data in console
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//as we are creating routers seprately in another file we will use at here
// app.get("/", (req, res) => {
//   res.render('index')
// });

app.use("/", indexRouter);
app.use("/upload", uploadRouter);
/** /user/test */
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server is running on poer 3000");
});
