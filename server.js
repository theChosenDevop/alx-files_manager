const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  res.send(`Server is listening on port ${port}`);
});
