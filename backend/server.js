const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const { socketConnect } = require("./socketServer");

//.env Config
dotenv.config();

//MongoDb Connection
connectDB();

const app = express();
// Socket
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(
  "/images",
  express.static(path.join(__dirname, "../backend/public/images"))
);
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

// =====================================SOCKET=========================================
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
// =====================================SOCKET=========================================

//Port
const PORT = process.env.PORT || 8080;

// Start the server
server.listen(PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`.bgBlue.white);
});
