const express = require("express");
const { connection } = require("./config/db");
const cors = require('cors');
const { Audiorouter } = require("./routes/AudioRouter");

require('dotenv').config();

const Port = process.env.port || 8080

const app = express();
app.use(express.json());



app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get("/",(req,res)=>{
    res.status(200).send("AudioApp")
});

app.use("/audio" , Audiorouter);

app.listen(Port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
    console.log(`Server is running at ${Port}`);
});
