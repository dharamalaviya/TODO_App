const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/itemApi")
const app = express()
app.use(express.json())
const port = process.env.PORT || 5000
const itemRouter = require("./routes/itemApi")
const cors = require('cors')

mongoose.connect("mongodb://localhost:27017/dbtodo").then(()=> console.log("Mongodb Connected"))
app.use(cors());
app.use("/item",itemRouter);



app.listen(port, () => {
    console.log("Server running on port", port)
})

