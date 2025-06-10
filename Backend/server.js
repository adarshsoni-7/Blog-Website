const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT;
const connectDb = require("./DB/db");
connectDb();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
