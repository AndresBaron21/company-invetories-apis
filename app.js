// const express = require('express');
// const app = express();
// const router = require('./src/routes/apis');
// const cors = require('cors');


// app.use(cors());
// // Add the prefix "/api" to all application routes
// app.use('/api', router);

// // Set the port on which the server will run
// const PORT = process.env.PORT || 3001;

// // We start the server
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


const http = require('http');

const server = http.createServer((req, res) => {
  res.end('hello world')
})

server.listen(3001)
console.log(`Server started on port 3001`);

