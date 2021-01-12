const express = require("express");
const app = express();
const port = process.env.PORT || "5000";

const apiRouter = require('./routes/api')

app.get("/", (req, res) => {
  // discuss how the api works here
  res.send("Hello Enye Reviewer. Nice to meet you !");
});

//route handling for the get request to '/api/rates'
app.use('/api', apiRouter)

// error handling
app.use((err, req, res, next) => {
  output = {
    result: {
      error: err.toString()
    }
  }
  res.json(output)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
