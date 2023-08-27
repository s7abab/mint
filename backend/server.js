const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path")

//.env Config
dotenv.config();

//MongoDb Connection
connectDB();

const app = express();

// Middlewares
app.use("/images", express.static(path.join(__dirname, "../backend/public/images")));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

//Routes
app.use("/auth", require("./routes/authRoute"));
app.use("/counselor", require("./routes/counselorRoute"));
app.use("/admin", require("./routes/adminRoute"));
app.use("/user", require("./routes/userRoute"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

//Port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`.bgBlue.white);
});
