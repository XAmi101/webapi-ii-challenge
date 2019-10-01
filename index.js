const express = require("express");
const dbRouter = require ("./data/db-router.js");
const server = express();
server.use(express.json());
server.use("/api/posts", dbRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Testing </h>
      <p>Welcome to the DB API</p>

    `);
  });
  

  server.listen(8000, () => {
    console.log('\n*** Server Running on http://localhost:8000 ***\n');
  });
  