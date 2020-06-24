const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api", cors(), require("./routes/api"));

mongoose.connect("mongodb+srv://tandat198:0842693293@cluster0-22leu.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () =>
    console.log("Connect to MongoDB successfully")
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
