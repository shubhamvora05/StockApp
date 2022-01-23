const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());


const userService = require("./user_service");

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(201).json({message:"Password Not Matched!",user});
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticate(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});